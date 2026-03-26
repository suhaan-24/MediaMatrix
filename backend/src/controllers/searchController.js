import Asset from '../models/Asset.js';
import { esClient } from '../config/elasticsearch.js';

// @desc    Fast text search across assets
// @route   GET /api/search
// @access  Public
export const searchMedia = async (req, res) => {
  try {
    const { q, type } = req.query;

    // 1. ElasticSearch Integration Flow
    if (esClient && q) {
       try {
         const esQuery = {
           bool: {
             must: [
               { multi_match: { query: q, fields: ['title^3', 'tags^2', 'description'] } }
             ]
           }
         };

         if (type && type !== 'all') {
           esQuery.bool.filter = [{ term: { type } }];
         }

         const result = await esClient.search({ index: 'assets', query: esQuery, _source: true });

         // Extract ordered IDs from ElasticSearch response
         const objectIds = result.hits.hits.map(hit => hit._id);

         // Hydrate results from MongoDB to grab full metadata and populated uploader reference
         const assets = await Asset.find({ _id: { $in: objectIds } }).populate('uploader', 'name email');
         
         // Secure ElasticSearch's relevance sorting order
         assets.sort((a, b) => objectIds.indexOf(a._id.toString()) - objectIds.indexOf(b._id.toString()));

         return res.status(200).json({
           success: true,
           count: assets.length,
           data: assets,
           source: 'elasticsearch'
         });
       } catch (esError) {
         console.error('ElasticSearch query failed, falling back to MongoDB:', esError.message);
       }
    }

    // 2. MongoDB Fallback Flow
    let query = {};
    if (q) {
      query.$text = { $search: q };
    }
    if (type && type !== 'all') {
      query.type = type;
    }

    let projection = {};
    let sortObj = { createdAt: -1 };

    if (q) {
      projection = { score: { $meta: 'textScore' } };
      sortObj = { score: { $meta: 'textScore' } };
    }

    const assets = await Asset.find(query, projection)
      .populate('uploader', 'name email')
      .sort(sortObj);

    return res.status(200).json({
      success: true,
      count: assets.length,
      data: assets,
      source: 'mongodb'
    });
  } catch (error) {
    console.error(`Search Error: ${error.message}`);
    res.status(500).json({ success: false, message: 'Server error during search' });
  }
};

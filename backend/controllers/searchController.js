import Asset from '../models/Asset.js';

// @desc    Fast native text search across assets
// @route   GET /api/search
// @access  Public
export const searchMedia = async (req, res) => {
  try {
    const { q, type } = req.query;
    let query = {};

    // Base text search utilizing the schema's text index
    if (q) {
      query.$text = { $search: q };
    }

    if (type && type !== 'all') {
      query.type = type;
    }

    // Default projection - if searching text, sort by relevance score
    let projection = {};
    let sortObj = { createdAt: -1 };

    if (q) {
      projection = { score: { $meta: 'textScore' } };
      sortObj = { score: { $meta: 'textScore' } };
    }

    const assets = await Asset.find(query, projection)
      .populate('uploader', 'name')
      .sort(sortObj);

    res.status(200).json({
      success: true,
      count: assets.length,
      data: assets,
    });
  } catch (error) {
    console.error(`Search Error: ${error.message}`);
    res.status(500).json({ success: false, message: 'Server error during search' });
  }
};

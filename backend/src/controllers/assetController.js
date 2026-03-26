import Asset from '../models/Asset.js';
import fs from 'fs';
import { bucket } from '../config/firebase.js';
import { esClient } from '../config/elasticsearch.js';

// @desc    Upload a new asset
// @route   POST /api/assets
// @access  Private
export const uploadAsset = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a file' });
    }

    const { title, description, tags, type, folderId } = req.body;

    // Determine type if not provided explicitly
    let assetType = type;
    if (!assetType) {
      if (req.file.mimetype.startsWith('image')) assetType = 'image';
      else if (req.file.mimetype.startsWith('video')) assetType = 'video';
      else if (req.file.mimetype.startsWith('audio')) assetType = 'audio';
      else assetType = 'document';
    }

    // Process tags string into array if needed
    let parsedTags = [];
    if (tags) {
      parsedTags = Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim());
    }

    // Default Fallback URL
    let fileUrl = `/uploads/${req.file.filename}`;

    // Firebase Upload Implementation
    if (bucket) {
      try {
        const dest = `assets/${req.file.filename}`;
        await bucket.upload(req.file.path, {
          destination: dest,
          metadata: { contentType: req.file.mimetype }
        });
        
        // Use Firebase REST URL format accessible if storage rules allow public read
        fileUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(dest)}?alt=media`;
        
        // Remove locally cached multer file after successful cloud upload
        fs.unlinkSync(req.file.path);
      } catch (err) {
        console.error('Firebase upload failed, falling back to local storage:', err);
      }
    }

    // Create the asset document
    const asset = await Asset.create({
      title: title || req.file.originalname,
      description,
      type: assetType,
      fileUrl: fileUrl,
      mimetype: req.file.mimetype,
      size: req.file.size,
      tags: parsedTags,
      uploader: req.user.id,
      folderId: folderId || null,
    });

    // ElasticSearch Index Implementation
    if (esClient) {
      try {
        await esClient.index({
          index: 'assets',
          id: asset._id.toString(),
          document: {
             title: asset.title,
             description: asset.description,
             tags: asset.tags,
             type: asset.type,
             folderId: asset.folderId ? asset.folderId.toString() : null,
             uploader: asset.uploader.toString(),
             createdAt: asset.createdAt
          }
        });
        await esClient.indices.refresh({ index: 'assets' });
      } catch (err) {
        console.error('ElasticSearch index failed:', err.message);
      }
    }

    res.status(201).json({
      success: true,
      data: asset,
    });
  } catch (error) {
    console.error(`Upload Error: ${error.message}`);
    res.status(500).json({ success: false, message: 'Server upload error', error: error.message });
  }
};

// @desc    Get all assets (with optional search/filter + pagination)
// @route   GET /api/assets
// @access  Public
export const getAssets = async (req, res) => {
  try {
    const { type, tag, search, folderId } = req.query;
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    let query = {};

    if (type) query.type = type;
    if (tag) query.tags = tag;
    if (folderId) query.folderId = folderId;
    if (search) {
      // Sanitize regex special chars to prevent injection
      const sanitized = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      query.$or = [
        { title: { $regex: sanitized, $options: 'i' } },
        { description: { $regex: sanitized, $options: 'i' } }
      ];
    }

    const totalCount = await Asset.countDocuments(query);
    const assets = await Asset.find(query)
      .populate('uploader', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: assets.length,
      totalCount,
      page,
      totalPages: Math.ceil(totalCount / limit),
      data: assets,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get asset by ID
// @route   GET /api/assets/:id
// @access  Public
export const getAssetById = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id).populate('uploader', 'name email');
    if (!asset) {
      return res.status(404).json({ success: false, message: 'Asset not found' });
    }
    res.status(200).json({ success: true, data: asset });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'Asset not found' });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

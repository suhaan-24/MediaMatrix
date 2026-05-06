import Asset from '../models/Asset.js';
import fs from 'fs';
import mongoose from 'mongoose';
import { bucket } from '../config/firebase.js';
import { cloudinary, cloudinaryConfigured } from '../config/cloudinary.js';
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

    // Default Fallback URL (local disk — only reliable in development)
    let fileUrl = `/uploads/${req.file.filename}`;

    // Cloudinary Upload (preferred — persistent cloud storage)
    if (cloudinaryConfigured) {
      try {
        const resourceType = req.file.mimetype.startsWith('video') ? 'video'
          : req.file.mimetype.startsWith('audio') ? 'video'  // Cloudinary uses 'video' for audio too
          : req.file.mimetype === 'application/pdf' ? 'raw'
          : 'image';

        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'mediamatrix/assets',
          resource_type: resourceType,
        });

        fileUrl = result.secure_url;
        fs.unlinkSync(req.file.path);
      } catch (err) {
        console.error('Cloudinary upload failed, falling back to local storage:', err.message);
      }
    // Firebase Upload (fallback if Firebase is configured but Cloudinary is not)
    } else if (bucket) {
      try {
        const dest = `assets/${req.file.filename}`;
        await bucket.upload(req.file.path, {
          destination: dest,
          metadata: { contentType: req.file.mimetype }
        });
        fileUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(dest)}?alt=media`;
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
    // If MongoDB is not connected, return dummy data to keep the UI looking populated
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({
        success: true,
        count: 8,
        totalCount: 8,
        page: 1,
        totalPages: 1,
        data: [
          { _id: 'mock1', title: 'Neon Cyberpunk', type: 'image', fileUrl: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&q=80' },
          { _id: 'mock2', title: 'Abstract Data', type: 'image', fileUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80' },
          { _id: 'mock3', title: 'Virtual Reality', type: 'image', fileUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&q=80' },
          { _id: 'mock4', title: 'Space Explorer', type: 'image', fileUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80' },
          { _id: 'mock5', title: 'Forest Path', type: 'image', fileUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80' },
          { _id: 'mock6', title: 'Ocean Waves', type: 'image', fileUrl: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80' },
          { _id: 'mock7', title: 'Mountain Peak', type: 'image', fileUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80' },
          { _id: 'mock8', title: 'City Lights', type: 'image', fileUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80' }
        ],
        message: 'Database offline fallback'
      });
    }

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

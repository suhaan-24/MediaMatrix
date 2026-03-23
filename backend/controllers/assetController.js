import Asset from '../models/Asset.js';

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

    // Create the asset document
    // NOTE: 'fileUrl' is a relative path to the local uploads directory for now.
    // In a production app with Firebase, this would be the Firebase Download URL.
    const asset = await Asset.create({
      title: title || req.file.originalname,
      description,
      type: assetType,
      fileUrl: `/uploads/${req.file.filename}`,
      mimetype: req.file.mimetype,
      size: req.file.size,
      tags: parsedTags,
      uploader: req.user.id,
      folderId: folderId || null,
    });

    res.status(201).json({
      success: true,
      data: asset,
    });
  } catch (error) {
    console.error(`Upload Error: ${error.message}`);
    res.status(500).json({ success: false, message: 'Server upload error', error: error.message });
  }
};

// @desc    Get all assets (with optional search/filter)
// @route   GET /api/assets
// @access  Public
export const getAssets = async (req, res) => {
  try {
    const { type, tag, search, folderId } = req.query;
    let query = {};

    if (type) query.type = type;
    if (tag) query.tags = tag;
    if (folderId) query.folderId = folderId;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const assets = await Asset.find(query)
      .populate('uploader', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: assets.length,
      data: assets,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

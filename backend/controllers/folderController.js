import Folder from '../models/Folder.js';
import Asset from '../models/Asset.js';

// @desc    Create a new folder
// @route   POST /api/folders
// @access  Private
export const createFolder = async (req, res) => {
  try {
    const { name, parentFolder } = req.body;

    const folder = await Folder.create({
      name,
      user: req.user.id,
      parentFolder: parentFolder || null,
    });

    res.status(201).json({ success: true, data: folder });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Folder with this name already exists here' });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get user's folders (optionally filtered by parent)
// @route   GET /api/folders
// @access  Private
export const getFolders = async (req, res) => {
  try {
    const { parentId } = req.query;
    
    // Find folders owned by the current user and at the specified level
    const folders = await Folder.find({
      user: req.user.id,
      parentFolder: parentId || null
    }).sort({ name: 1 });

    res.status(200).json({ success: true, count: folders.length, data: folders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Delete a folder
// @route   DELETE /api/folders/:id
// @access  Private
export const deleteFolder = async (req, res) => {
  try {
    const folder = await Folder.findById(req.params.id);

    if (!folder) {
      return res.status(404).json({ success: false, message: 'Folder not found' });
    }

    // Match ownership
    if (folder.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized to delete this folder' });
    }

    // Check for child folders or assets (prevent deletion if not empty for safety)
    const subFolders = await Folder.countDocuments({ parentFolder: folder._id });
    const assets = await Asset.countDocuments({ folderId: folder._id });

    if (subFolders > 0 || assets > 0) {
       return res.status(400).json({ success: false, message: 'Cannot delete a folder that is not empty' });
    }

    await Folder.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

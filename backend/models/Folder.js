import mongoose from 'mongoose';

const folderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a folder name'],
      trim: true,
      maxlength: [50, 'Folder name cannot exceed 50 characters'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    parentFolder: {
      type: mongoose.Schema.ObjectId,
      ref: 'Folder',
      default: null,
    },
  },
  { timestamps: true }
);

// Prevent duplicate folder names under the same parent for a user
folderSchema.index({ name: 1, user: 1, parentFolder: 1 }, { unique: true });

const Folder = mongoose.model('Folder', folderSchema);
export default Folder;

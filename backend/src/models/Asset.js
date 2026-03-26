import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    type: {
      type: String,
      required: [true, 'Please specify asset type'],
      enum: ['image', 'video', 'audio', 'document', '3d'],
    },
    fileUrl: {
      type: String,
      required: [true, 'File URL/Path is required'],
    },
    mimetype: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    tags: {
      type: [String],
    },
    uploader: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    folderId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Folder',
    },
  },
  { timestamps: true }
);

// Add compound text index for search
assetSchema.index(
  { title: 'text', description: 'text', tags: 'text' },
  { weights: { title: 10, tags: 5, description: 1 } }
);

const Asset = mongoose.model('Asset', assetSchema);
export default Asset;

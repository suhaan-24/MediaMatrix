import { Router } from 'express';
import { uploadAsset, getAssets, getAssetById } from '../controllers/assetController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = Router();

router.route('/')
  .get(getAssets)
  .post(protect, upload.single('file'), uploadAsset);

router.route('/:id').get(getAssetById);

export default router;

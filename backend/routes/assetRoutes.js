import { Router } from 'express';
import { uploadAsset, getAssets } from '../controllers/assetController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = Router();

router.route('/')
  .get(getAssets)
  .post(protect, upload.single('file'), uploadAsset);

export default router;

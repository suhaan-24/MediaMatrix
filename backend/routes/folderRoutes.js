import { Router } from 'express';
import { createFolder, getFolders, deleteFolder } from '../controllers/folderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.use(protect); // All folder routes are private

router.route('/')
  .post(createFolder)
  .get(getFolders);

router.route('/:id')
  .delete(deleteFolder);

export default router;

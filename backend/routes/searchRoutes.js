import { Router } from 'express';
import { searchMedia } from '../controllers/searchController.js';

const router = Router();

router.route('/').get(searchMedia);

export default router;

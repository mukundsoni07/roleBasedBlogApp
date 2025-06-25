import express from 'express';
import { getPosts, addPost, deletePost } from '../controllers/postController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', protect, adminOnly, addPost);
router.delete('/:id', protect, adminOnly, deletePost);

export default router;

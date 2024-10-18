import express from 'express';
import { isAuth } from '../middleware/authMiddleware';
import * as postController from '../controllers/postController';

const router = express.Router();

router.post('/api/posts', isAuth, postController.createPost);
router.get('/api/posts/:id', postController.getPost);
router.get('/api/posts', postController.getAllPosts);

export default router;
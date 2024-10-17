import express from 'express';
import { isAuth } from '../middleware/authMiddleware';
import * as postController from '../controllers/postController';

const router = express.Router();

router.post('/posts', isAuth, postController.createPost);

export default router;
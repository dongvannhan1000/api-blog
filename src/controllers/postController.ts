import { Request, Response } from 'express';
import { Post } from '../models/user';

export const createPost = async (req: Request, res: Response) => {
  const { title, content, authorId } = req.body;
  
  try {
    const newPost = await Post.create({
      data: {
        title,
        content,
        authorId,
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create post' });
  }
};


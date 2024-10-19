import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/authService';
import passport from 'passport';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err: any, user: any, info: any) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: 'Login fail', info });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
    return res.json({ message: 'Login successful', token });
  })(req, res, next);
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ message: 'Logout successful' });
    });
  });
};

export const profile = (req: Request, res: Response) => {
  res.json(req.user);
};

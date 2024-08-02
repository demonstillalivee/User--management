import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomError } from '../utils/customError';

export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    throw new CustomError('No token, authorization denied', 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { user: { id: string } };
    req.user = decoded.user;
    next();
  } catch (err) {
    throw new CustomError('Token is not valid', 401);
  }
};
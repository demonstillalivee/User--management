import { Request, Response } from 'express';
import User from '../models/User';
import { CustomError } from '../utils/customError';

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user!.id).select('-password');
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    res.json(user);
  } catch (err) {
    if (err instanceof CustomError) {
      res.status(err.statusCode).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Server Error' });
    }
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { name, email, bio } = req.body;
    const user = await User.findById(req.user!.id);
    if (!user) {
      throw new CustomError('User not found', 404);
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.bio = bio || user.bio;

    await user.save();

    res.json(user);
  } catch (err) {
    if (err instanceof CustomError) {
      res.status(err.statusCode).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Server Error' });
    }
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    res.json(user);
  } catch (err) {
    if (err instanceof CustomError) {
      res.status(err.statusCode).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Server Error' });
    }
  }
};
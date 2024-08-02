import express from 'express';
import { getProfile, updateProfile, getAllUsers, getUserById } from '../controllers/userController';
import { auth } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.get('/', auth, getAllUsers);
router.get('/:id', auth, getUserById);

export default router;
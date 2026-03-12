import { Router } from 'express';
import { getAllUsers, createUser, loginUser, getUserById, updateUser } from '../controllers/user.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', createUser);
router.post('/login', loginUser);

router.get('/', getAllUsers);
router.get('/:id', protect, getUserById);
router.put('/:id', protect, updateUser);

export default router;
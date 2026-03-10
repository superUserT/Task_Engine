import { Router } from 'express';
import { getAllUsers, createUser, loginUser } from '../controllers/user.controller';

const router = Router();

router.post('/register', createUser);
router.post('/login', loginUser);

router.get('/', getAllUsers); // This should be protected in a real app

export default router;
import { Router } from 'express';
import { getAllUsers, createUser, loginUser } from '../controllers/user.controller';

const router = Router();

router.post('/register', createUser);
router.post('/login', loginUser);

router.get('/', getAllUsers); 
export default router;
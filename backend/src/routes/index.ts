import { Router } from 'express';
import userRoutes from './user.routes';
import cohortRoutes from './cohort.routes';
import taskRoutes from './task.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/cohorts', cohortRoutes);
router.use('/tasks', taskRoutes);

export default router;
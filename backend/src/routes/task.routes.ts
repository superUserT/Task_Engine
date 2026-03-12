import { Router } from 'express';
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from '../controllers/task.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.use(protect);

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTaskById).put(updateTask).delete(deleteTask);

export default router;
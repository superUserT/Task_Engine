import { Router } from 'express';
import {
  createCohort,
  deleteCohort,
  getAllCohorts,
  getCohortById,
  updateCohort,
} from '../controllers/cohort.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.use(protect);

router.route('/').get(getAllCohorts).post(createCohort);
router.route('/:id').get(getCohortById).put(updateCohort).delete(deleteCohort);

export default router;
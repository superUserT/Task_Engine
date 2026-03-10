import { Router } from 'express';
import { getAllCohorts } from '../controllers/cohort.controller';

const router = Router();

router.get('/', getAllCohorts);

export default router;
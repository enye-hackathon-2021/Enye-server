import { Router } from 'express';
import { getDoctorSolutions, getQuestionSolution, getUserSolutions, postSolution } from '../controllers/solution';
import SolutionValidator from '../validators/solution';
import validate from '../middlewares/validate';

const router = Router();

router.post(
  '/',
  SolutionValidator.postSolution,
  validate,
  postSolution
);

router.get(
  '/user-solutions',
  getUserSolutions
);

router.get(
  '/doctor-solutions',
  getDoctorSolutions
);

router.get(
  '/:questionId',
  getQuestionSolution
);

export default router;

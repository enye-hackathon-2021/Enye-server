import { Router } from 'express';
import { getAllUnAnsweredQuestions, getQuestion, getUserQuestions, postQuestion } from '../controllers/question';
import validate from '../middlewares/validate';
import QuestionValidator from '../validators/question';

const router = Router();

router.post(
  '/',
  QuestionValidator.postQuestion,
  validate,
  postQuestion
);

router.get(
  '/user-questions',
  getUserQuestions
);

router.get(
  '/available-questions',
  getAllUnAnsweredQuestions
);

router.get(
  '/:questionId',
  getQuestion
);

export default router;

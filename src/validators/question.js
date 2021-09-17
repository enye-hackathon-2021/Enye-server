import { body } from 'express-validator';

const QuestionValidator = {
  postQuestion: [
    body('question')
      .isString()
      .withMessage('Should be of type string')
      .not()
      .isEmpty()
      .withMessage('Cannot be empty'),  
  ]
};

export default QuestionValidator;

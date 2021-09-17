import { body } from 'express-validator';

const SolutionValidator = {
  postSolution: [
    body('questionId')
      .isString()
      .withMessage('Should be of type string')
      .not()
      .isEmpty()
      .withMessage('Cannot be empty'),  
    body('answer')
      .isString()
      .withMessage('Should be of type string')
      .not()
      .isEmpty()
      .withMessage('Cannot be empty'),  
  ]
};

export default SolutionValidator;

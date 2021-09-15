import { body } from 'express-validator';

const AuthValidator = {
  login: [
    body('email')
      .not()
      .isEmpty()
      .withMessage('Cannot be empty')
      .isString()
      .isEmail()
      .withMessage('Should be an email address')
      .toLowerCase(),
    body('role')
      .not()
      .isEmpty()
      .withMessage('Cannot be empty')
      .isString()
      .withMessage('Should be a string')
      .custom((role) => {
        const allowedRoles = ['doctor', 'patient'];
        if (!allowedRoles.includes(role)) {
          throw new Error('Should be one of doctor, patient');
        }
        return true
      }),
    body('password')
      .not()
      .isEmpty()
      .withMessage('Cannot be empty')
      .isString()
      .withMessage('Should be a string'),
  ],
  register: [
    body('email')
      .not()
      .isEmpty()
      .withMessage('Cannot be empty')
      .isString()
      .isEmail()
      .withMessage('Should be an email address')
      .toLowerCase(),
    body('role')
      .not()
      .isEmpty()
      .withMessage('Cannot be empty')
      .isString()
      .withMessage('Should be a string')
      .custom((role) => {
        const allowedRoles = ['doctor', 'patient'];
        if (!allowedRoles.includes(role)) {
          throw new Error('Should be one of doctor, patient');
        }
        return true
      }),
    body('password')
      .not()
      .isEmpty()
      .withMessage('Cannot be empty')
      .isString()
      .withMessage('Should be a string'),
    body('name')
      .not()
      .isEmpty()
      .withMessage('Cannot be empty')
      .isString()
      .withMessage('Should be a string'),
    body('age')
      .not()
      .isEmpty()
      .withMessage('Cannot be empty')
      .isInt()
      .withMessage('Should be an integer')
      .toInt(),
    body('gender')
      .not()
      .isEmpty()
      .withMessage('Cannot be empty')
      .isString()
      .withMessage('Should be a string')
      .custom((gender) => {
        const allowedGenders = ['male', 'female'];
        if (!allowedGenders.includes(gender)) {
          throw new Error('Should be one of male, female');
        }
        return true
      }),
  ]
};

export default AuthValidator;

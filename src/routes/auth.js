import { Router } from 'express';
import { login, register } from '../controllers/auth';
import AuthValidator from '../validators/auth';
import validate from '../middlewares/validate';

const router = Router();

// Register endpoint
router.post(
  '/register',
  AuthValidator.register,
  validate,
  register  
);

// Login endpoint
router.post(
  '/login',
  AuthValidator.login,
  validate,
  login  
);

export default router;

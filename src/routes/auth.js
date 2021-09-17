import { Router } from 'express';
import { fundUserWallet, getUserBalance, login, register } from '../controllers/auth';
import AuthValidator from '../validators/auth';
import validate from '../middlewares/validate';
import verifyToken from '../middlewares/token';

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

router.get(
  '/balance',
  verifyToken(),
  getUserBalance,
);

router.post(
  '/fund-wallet',
  verifyToken(),
  fundUserWallet
);


export default router;

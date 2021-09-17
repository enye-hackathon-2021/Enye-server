require('dotenv').config();
import jwt from 'jsonwebtoken';

const verifyToken = () => (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    throw new Error('Please log in ');
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    throw new Error('Invalid token, Please login')
  }

  const user = jwt.verify(token, process.env.JWT_SECRET);

  if (!user) {
    throw new Error('Invalid token, Please login');
  }

  req.user = user;
  res.locals.user = user;
  next();
};

export default verifyToken;

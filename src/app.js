require('dotenv').config();
import '@babel/polyfill';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './docs';
import indexRouter from './routes/index';
import authRouter from './routes/auth';
import questionRouter from './routes/question';
import solutionRouter from './routes/solution';
import verifyToken from './middlewares/token';
import handleResponse from './utils/response';

const debug = require('debug')('enye-server:server');
const app = express();

// Call mongoose connect function
(async () => {
  await mongoose.connect(process.env.DB_URL);
  debug('Database connection established');
})();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
app.use('/api/v1/auth', authRouter);
app.use(verifyToken());
app.use('/api/v1/questions', questionRouter);
app.use('/api/v1/solutions', solutionRouter);

// 404 handler
app.use((req, res, next) => {
  handleResponse(res, 400, 'Route not found');
});

// Express error handler
app.use((error, req, res, next) => {
  handleResponse(res, 400, 'Error', undefined, error.message);
});

module.exports = app;

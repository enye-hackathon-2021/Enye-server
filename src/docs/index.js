require('dotenv').config();
import authDoc from './auth';

const doc = {
  swagger: '2.0',
  info: {
    version: '1.0-beta',
    title: 'ENYE',
    description: 'Health api',
  },
  host: process.env.BACKEND_URL ||'localhost:3000',
  basePath: '/api/v1',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    ...authDoc,
  },
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      in: 'header',
      description: 'Bearer <token>',
      name: 'authorization'
    }
  }
};

export default doc;

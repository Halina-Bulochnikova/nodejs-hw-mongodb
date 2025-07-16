// src/server.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import pino from 'pino-http';
import router from './routers/index.js';
import authRouter from './routers/auth.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { contactSchema } from './validation/contacts.js';
import cookieParser from 'cookie-parser';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
import { UPLOAD_DIR } from './constants/index.js';


const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan('dev'));
  app.use(cookieParser());

  const isDev = process.env.NODE_ENV !== 'production';

app.use(
  pino(
    isDev
      ? { transport: { target: 'pino-pretty' } }
      : {} 
  )
);
  app.use('/contacts', router);
  app.use('/auth', authRouter);
  app.use('/uploads', express.static(UPLOAD_DIR));
  
  app.use('/api-docs', swaggerDocs());
  


  app.get('/', (req, res) => {
    res.json({ message: 'Hello world!' });
  });
  app.post(
    '/contacts',
    async (req, res, next) => {
      try {
        await contactSchema.validateAsync(req.body, { abortEarly: false });
        //..
      } catch (validationError) {
        next(validationError);
      }
    },
  );

  app.use(notFoundHandler);

  app.use(errorHandler);
  


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

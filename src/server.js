// src/server.js
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import router from './routers/contacts.js';

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(pino({ transport: { target: 'pino-pretty' } }));
  app.use('/contacts', router);


  app.get('/', (req, res) => {
    res.json({ message: 'Hello world!' });
  });


  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  return app;
};

// src/index.js

import dotenv from 'dotenv';
dotenv.config();

import { setupServer } from './server.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const PORT = Number(getEnvVar('PORT', '3000'));

const app = setupServer();

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

bootstrap();
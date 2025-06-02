// src/index.js

import dotenv from "dotenv";
dotenv.config();

import { setupServer } from './server.js';

const PORT = process.env.PORT || 3000;
const app = setupServer();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });


// src/services/auth.js

import { UserCollection } from '../db/models/user.js';

export const registerUser = async (payload) => {
  return await UserCollection.create(payload);
};
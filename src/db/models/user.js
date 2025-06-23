// src/db/models/user.js
import { model, Schema } from 'mongoose';

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true, match: /\S+@\S+\.\S+/ },
        password: { type: String, required: true }
    },
        {
            timestamps: true,
          },
);
export const UserCollection = model('user', userSchema);
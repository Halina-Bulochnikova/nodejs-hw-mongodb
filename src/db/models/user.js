// src/db/models/user.js
import { model, Schema } from 'mongoose';
import { ROLES } from '../../constants/index.js';

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true, match: /\S+@\S+\.\S+/ },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: [ROLES.TEACHER, ROLES.PARENT],
            default: ROLES.PARENT,
          },
    },
    {
        timestamps: true, versionKey: false },
);

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
}; 

export const UserCollection = model('user', userSchema);
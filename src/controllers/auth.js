// src/controllers/auth.js

import {
  logoutUser,
  refreshUsersSession,
  registerUser,
  requestResetToken,
  loginUser
} from '../services/auth.js';

import { ONE_DAY } from '../constants/index.js';
import createHttpError from 'http-errors';
import { getEnvVar } from '../utils/getEnvVar.js';
import { SessionCollection } from '../db/models/session.js';
import { UserCollection } from '../db/models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.json({
    status: 200,
    message: 'Successfully logged in a user!',
    data: { accessToken: session.accessToken },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');
  res.status(204).send();
};

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: session.accessToken },
  });
};

export const requestSendResetEmailController = async (req, res, next) => {
  try {
    await requestResetToken(req.body.email);
    res.status(200).json({
      status: 200,
      message: 'Reset password email has been successfully sent.',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

export const resetPasswordController = async (req, res, next) => {
  const { token, password } = req.body;

  try {
    const payload = jwt.verify(token, getEnvVar('JWT_SECRET'));
    const user = await UserCollection.findOne({ email: payload.email });

    if (!user) {
      throw createHttpError(404, 'User not found!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await UserCollection.updateOne({ _id: user._id }, { $set: { password: hashedPassword } });
    await SessionCollection.deleteMany({ userId: user._id });

    res.status(200).json({
      status: 200,
      message: 'Password has been successfully reset.',
      data: {},
    });
  } catch (err) {
    console.error(err);
    if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
      return next(createHttpError(401, 'Token is expired or invalid.'));
    }
    next(err);
  }
};

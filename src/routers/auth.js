// src/routers/auth.js

import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUserSchema, registerUserSchema, requestSendResetEmailSchema } from '../validation/auth.js';
import { loginUserController, logoutUserController, registerUserController, requestSendResetEmailController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { refreshUserSessionController } from '../controllers/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);
router.post('/logout', ctrlWrapper(logoutUserController));
router.post('/refresh', ctrlWrapper(refreshUserSessionController));

router.post(
  '/auth/send-reset-email',
  validateBody(requestSendResetEmailSchema),
  ctrlWrapper(requestSendResetEmailController),
);

export default router;

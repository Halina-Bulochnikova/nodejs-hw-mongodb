//src/routes/contacts.js

import { Router } from 'express';
import { getAllContactsController  } from '../controllers/contacts.js';

const router = Router();

router.get('/', getAllContactsController );

export default router;
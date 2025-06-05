//src/routes/contacts.js

import { Router } from 'express';
import { getAllContactsController, getContactByIdController   } from '../controllers/contacts.js';

const router = Router();

router.get('/', getAllContactsController );
router.get('/:contactId', getContactByIdController);

export default router;

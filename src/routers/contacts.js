//src/routes/contacts.js

import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
    getAllContactsController,
    getContactByIdController,
    createContactController,
    patchContactController,
    deleteContactController
} from '../controllers/contacts.js';
import { updateContactSchema, contactSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';


const router = Router();

router.use(authenticate);
router.get('/', checkRoles(ROLES.TEACHER), ctrlWrapper(getAllContactsController));
router.get('/:contactId', checkRoles(ROLES.TEACHER, ROLES.PARENT), isValidId, ctrlWrapper(getContactByIdController));
router.post('/', checkRoles(ROLES.TEACHER), validateBody(contactSchema), ctrlWrapper(createContactController));
router.patch('/:contactId', checkRoles(ROLES.TEACHER, ROLES.PARENT), isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));
router.delete('/:contactId', checkRoles(ROLES.TEACHER), isValidId, ctrlWrapper(deleteContactController));

export default router;

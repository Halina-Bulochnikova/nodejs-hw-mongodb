//src/validation/contacts.js

import Joi from 'joi';


export const contactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().min(3).max(20).optional(),
    contactType: Joi.string().valid("work", "home", "personal").required(),
    isFavourite: Joi.boolean().optional(),
});
export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    phoneNumber: Joi.string().min(3).max(20),
    email: Joi.string().email().min(3).max(20),
    contactType: Joi.string().valid("work", "home", "personal"),
    isFavourite: Joi.boolean(),
  }).min(1);
  
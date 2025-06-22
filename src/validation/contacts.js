//src/validation/contacts.js

import Joi from 'joi';


export const contactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required()
      .messages({
      'string.base': '"name" must be a string',
      'string.empty': '"name" is required',
      'string.min': '"name" should have at least 3 characters',
      'string.max': '"name" should have at most 20 characters',
      'any.required': '"name" is required'
    }),
    phoneNumber: Joi.string().min(3).max(20).required()
        .messages({
        'string.empty': '"phoneNumber" is required',
        'string.min': '"phoneNumber" should have at least 3 characters',
        'string.max': '"phoneNumber" should have at most 20 characters',
        'any.required': '"phoneNumber" is required'
      }),
    email: Joi.string().email().min(3).max(20).optional()
        .messages({
        'string.email': '"email" must be a valid email address',
        'string.min': '"email" should have at least 3 characters',
        'string.max': '"email" should have at most 20 characters',
      }),
    contactType: Joi.string().valid("work", "home", "personal").required()
        .messages({
        'any.only': '"contactType" must be one of [work, home, personal]',
        'any.required': '"contactType" is required',
      }),
    isFavourite: Joi.boolean().optional()
        .messages({
        'boolean.base': '"isFavourite" must be true or false',
      }),
});
export const updateContactSchema = contactSchema.fork(
    Object.keys(contactSchema.describe().keys),
    (schema) => schema.optional())
    .min(1);
  
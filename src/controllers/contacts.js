// src/controllers/contacts.js

import createHttpError from 'http-errors';
import { createContact, getAllContacts, getContactById } from "../services/contacts.js";

export const getAllContactsController = async (req, res, next) => {
    try {
        const contacts = await getAllContacts();
        res.status(200).json({
            status: 200,
            message: "Сontact successfully found!",
            data: contacts,
        });
    } catch (error) {
        next(error);
    }
};

export const getContactByIdController = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const contact = await getContactById(contactId);
  
      if (!contact) {
        throw createHttpError(404, "Contact not found");
      }
  
      res.status(200).json({
        status: 200,
        message: "Successfully found contact with id {contactId}!",
        data: contact,
      });
    } catch (error) {
      next(error);
    }
}; 
  
export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);

  res.status(200).json({
    status: 200,
    message: "Successfully patched a contact!",
    data: contact,
  });
};
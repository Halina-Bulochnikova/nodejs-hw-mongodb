// src/controllers/contacts.js

import { getAllContacts, getContactById } from "../services/contacts.js";

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


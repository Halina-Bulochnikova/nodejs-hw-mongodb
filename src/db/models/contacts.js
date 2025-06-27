 // src/db/models/contacts.js 

import { model, Schema } from 'mongoose';
import mongoose from 'mongoose';

 const contactsSchema = new Schema(
   {
     name: {
       type: String,
       required: true,
     },
     phoneNumber: {
       type: String,
       required: true,
         },
     email: {
       type: String,
     },
     contactType : {
       type: String,
       enum: ['work', 'home', 'personal'],
       required: true,
       default: 'personal',
     },
     
     isFavourite: {
       type: Boolean,
       default: false,
     },
     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
   },
   {
     timestamps: true,
   },
);
 
export const ContactsCollection = model('contacts', contactsSchema);

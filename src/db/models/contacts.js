 // src/db/models/contacts.js 

 import { model, Schema } from 'mongoose';

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
   },
   {
     timestamps: true,
   },
);
 
export const ContactsCollection = model('contacts', contactsSchema);

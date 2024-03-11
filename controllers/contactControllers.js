const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc Get all contacts
//@route Get /api/contacts
//@access private
const getContacts = asyncHandler(async(req,res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

//@desc Create New contacts
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async(req,res) => {
    console.log("The request body is :", req.body);
    const{name, email, phone} = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error("All the fields are mandatory !!");
    }
const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id
});
  res.status(201).json(contact);
});

//@desc Get Contact
//@route POST /api/contacts
//@access private
const getContact = asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id);//use findById to get an individual contact
     if(!contact){
        res.status(404);
        throw new Error("Contact not found");
     }
    res.status(200).json(contact);
});

//@desc Update Contact
//@route PUT /api/contacts/:id
//@access private
//in other to update a contact, you will need to fetch a contact
const updateContact = asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id);//use findById to get an individual contact
     if(!contact){
        res.status(404);
        throw new Error("Contact not found");
     }

     if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User do not have permission to update other user's contact");
     }

     const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true}
     );
    res.status(200).json(updatedContact);
});

//@desc delete Contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id);//use findById to get an individual contact
     if(!contact){
        res.status(404);
        throw new Error("Contact not found");
     }
     if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User do not have permission to update other user's contact");
     }

        await Contact.deleteOne({_id: req.params.id});
       res.status(200).json(contact);
  
     
    
});

module.exports = {
    getContacts, 
    createContact, 
    getContact,
    updateContact,
    deleteContact
};
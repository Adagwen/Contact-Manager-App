const express = require("express");
const router = express.Router();
const{
    getContacts, 
    createContact, 
    getContact,
    updateContact,
    deleteContact
} = require("../controllers/contactControllers");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);//use this for all the route
router.route("/").get(getContacts)
router.route("/").post(createContact);
router.route( "/:id").get(getContact).put(updateContact).delete(deleteContact);



module.exports = router;

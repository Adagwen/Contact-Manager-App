const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    //the user_id is for user who is creating the contact
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: [true, "Please add the contact name"],
    },
    email: {
        type: String,
        required: [true, "Please add the contact email address"],
    },
    phone: {
        type: String,
        required: [true, "Please add the contact phone number"],
    },
    
    
}, {
    timestamps: true,
});

module.exports = mongoose.model("contact", contactSchema);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: [true, "Please provide the email"],
        index: true
    },
    role: {
        type: String,
        default: "subscriber"
    },
    cart: {
        type: Array,
        default: []
    },
    address: {
        type: String
    },
    picture: String

}, { timestamps: true })

module.exports = mongoose.model("User", userSchema);
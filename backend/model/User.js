const mongoose = require("mongoose");

// Define user schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    admin:{type: Boolean ,default:false},
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
   
});

const User = mongoose.model('User', userSchema);

module.exports = User;
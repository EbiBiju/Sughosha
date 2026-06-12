const mongoose = require('mongoose');

// This is the blueprint for every user in your database
const userSchema = new mongoose.Schema({
    name: {                 // <--- ADD THIS SECTION
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true, // Cannot be empty
        unique: true,   // Cannot have duplicate emails
        trim: true,     // Removes spaces from start/end
        lowercase: true // Converts "User@Gmail.com" to "user@gmail.com"
    },
    password: {
        type: String,
        required: true,
        minlength: 6    // Minimum password length
    },
    // We will add Google/Facebook IDs here later
}, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt' times

module.exports = mongoose.model('User', userSchema);
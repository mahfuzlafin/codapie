const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'A user must have a username'],
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'A user must have an email'],
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'A user must have a password'],
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

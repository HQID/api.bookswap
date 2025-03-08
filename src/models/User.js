const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    fullname: String,
    username: String,
    gender: String,
    address: String,
    telephone: Number,
    email: {
        type: String,
        unique: true,
    },
    password: String
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
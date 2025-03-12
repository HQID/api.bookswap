const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    fullname: String,
    username: String,
    gender: {type: String, enum:['Laki-laki', 'Perempuan']},
    city: String,
    address: String,
    phone: Number,
    email: {
        type: String,
        unique: true,
    },
    password: String,
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
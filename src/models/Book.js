const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
    title: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    description: String,
    author: String,
    publisher: String,
    isbn: String,
    languange: String,
    pages: Number,
    published: Date,
    category: [String],
    price: Number,
    stock: Number,
    image: String,
})

const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;
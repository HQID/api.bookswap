const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
    title: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    purchase: Date,
    description: String,
    authors: String,
    publisher: String,
    isbn: String,
    languange: String,
    pages: Number,
    published: Date,
    category: [String],
    image: String,
    location: String,
    status: {
        type: String,
        enum: ['available', 'exchanged'],
        default: 'available'
    }
})

const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;
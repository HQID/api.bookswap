const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },
    status: {
        type: String,
        enum: ['wishlist', 'traded'],
        default: 'wishlist'
    }
})

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
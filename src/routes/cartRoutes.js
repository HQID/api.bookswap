const express = require('express');
const router = express.Router();
const cors = require('cors');
const { addToCart, getCart, removeFromCart } = require('../controller/cartController');
const { verifyUser } = require('../controller/authController');

router.use(
    cors({
        credentials: true,
        origin: ['http://localhost:3003']
    })
);

router.post('/cart/add', verifyUser, addToCart);
router.get('/cart', verifyUser, getCart);
router.delete('/cart/delete/:id', verifyUser, removeFromCart);

module.exports = router;
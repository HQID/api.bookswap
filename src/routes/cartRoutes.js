const express = require('express');
const router = express.Router();
const cors = require('cors');
const { addToCart, getCart, removeFromCart } = require('../controller/cartController');
const { verifyUser } = require('../controller/authController');
require('dotenv').config();

router.use(
    cors({
        credentials: true,
        origin: [process.env.BACKEND, process.env.FRONTEND]
    })
);

router.post('/cart/add', verifyUser, addToCart);
router.get('/cart', verifyUser, getCart);
router.delete('/cart/delete/:id', verifyUser, removeFromCart);

module.exports = router;
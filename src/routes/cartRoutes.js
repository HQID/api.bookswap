const express = require('express');
const router = express.Router();
const cors = require('cors');
const { addToCart, getCart, removeFromCart } = require('../controller/cartController');

router.use(
    cors({
        credentials: true,
        origin: ['http://localhost:3003']
    })
);

router.post('/cart/add', addToCart);
router.get('/cart', getCart);
router.delete('/cart/delete/:id', removeFromCart);

module.exports = router;
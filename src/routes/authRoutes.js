const express = require('express');
const router = express.Router();
const cors = require('cors');
const { registerUser, loginUser } = require('../controller/authController');
const rateLimit = require('express-rate-limit');

// middleware
router.use(
    cors({
        credentials: true,
        origin: ['http://localhost:3003']
    })
);

const loginLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 menit
    max: 5, // Maksimal 5 request per IP dalam 5 menit
    message: { error: "Terlalu banyak percobaan login, coba lagi nanti." }
});

router.get('/', (req, res) => {
    res.json({message: 'Welcome to BookSwap API'});
})
router.post('/register', registerUser);
router.get('/login', loginLimiter, loginUser);
router.get('/getuser', (req, res) => {
    res.json({message: 'Welcome to BookSwap API'});
})

module.exports = router
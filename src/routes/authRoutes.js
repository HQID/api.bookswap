const express = require('express');
const router = express.Router();
const cors = require('cors');
const { registerUser, loginUser, logoutUser } = require('../controller/authController');
const rateLimit = require('express-rate-limit');

// middleware
router.use(
    cors({
        credentials: true,
        origin: ['http://localhost:3003', 'http://localhost:5173']
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
router.post('/login', loginLimiter, loginUser);
router.get('/logout', logoutUser)

module.exports = router
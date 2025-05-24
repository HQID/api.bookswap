const express = require('express');
const router = express.Router();
const cors = require('cors');
const { registerUser, loginUser, verifyUser, getUser, logoutUser } = require('../controller/authController');
const rateLimit = require('express-rate-limit');
const User = require('../models/User');

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
router.post('/logout', logoutUser)
router.get('/verify', verifyUser, (req, res) => {
    return res.status(200).json({status: true, message: 'Authorized'});
})
router.get('/user', verifyUser, getUser)
router.get('/allUser', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router
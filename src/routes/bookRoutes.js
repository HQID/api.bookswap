const express = require('express');
const router = express.Router();
const cors = require('cors');
const {addBook} = require('../controller/bookController')

// middleware
router.use(
    cors({
        credentials: true,
        origin: ['http://localhost:3003']
    })
);

router.post('/addBook', addBook)

module.exports = router
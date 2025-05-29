const express = require('express');
const router = express.Router();
const cors = require('cors');
const {addBook, getBooks, getMyBooks, deleteBook, getBookById} = require('../controller/bookController')
const { verifyUser } = require('../controller/authController');

// middleware
router.use(
    cors({
        credentials: true,
        origin: [process.env.BACKEND, process.env.FRONTEND]
    })
);

router.post('/book/add', verifyUser, addBook)
router.get('/book', getBooks)
router.get('/book/my', verifyUser, getMyBooks)
router.get('/book/:id', getBookById)
router.delete('/book/delete/:id', verifyUser, deleteBook)

module.exports = router
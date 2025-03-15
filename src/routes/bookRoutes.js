const express = require('express');
const router = express.Router();
const cors = require('cors');
const {addBook, getBooks, getMyBooks, deleteBook} = require('../controller/bookController')

// middleware
router.use(
    cors({
        credentials: true,
        origin: ['http://localhost:3003']
    })
);

router.post('/addBook', addBook)
router.get('/getBooks', getBooks)
router.get('/getMyBooks', getMyBooks)
router.delete('/deleteBook/:id', deleteBook)

module.exports = router
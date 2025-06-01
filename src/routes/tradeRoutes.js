const express = require('express');
const router = express.Router();
const cors = require('cors');
const { verifyUser } = require('../controller/authController');
const { getTradeRequests, getMyTrade, requestTrade, respondTrade, completeTrade, getAllTrade, deleteTrade} = require('../controller/tradeController');
require('dotenv').config();

router.use(
    cors({
        credentials: true,
        origin: [process.env.BACKEND, process.env.FRONTEND]
    })
);

router.get('/trade/all', getAllTrade);
router.delete('/trade/delete/:id', deleteTrade);
router.get('/trade', verifyUser, getTradeRequests);
router.get('/trade/my', verifyUser, getMyTrade);
router.post('/trade/request', verifyUser, requestTrade);
router.patch('/trade/respond', verifyUser, respondTrade);
router.patch('/trade/complete', verifyUser, completeTrade);

module.exports = router;
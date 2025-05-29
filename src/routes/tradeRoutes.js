const express = require('express');
const router = express.Router();
const cors = require('cors');
const { getTradeRequests, getMyTrade, requestTrade, respondTrade, completeTrade, getAllTrade } = require('../controller/tradeController');
require('dotenv').config();

router.use(
    cors({
        credentials: true,
        origin: [process.env.BACKEND, process.env.FRONTEND]
    })
);

router.get('/trade/all', getAllTrade);
router.get('/trade', getTradeRequests);
router.get('/trade/my', getMyTrade);
router.post('/trade/request', requestTrade);
router.patch('/trade/respond', respondTrade);
router.patch('/trade/complete', completeTrade);

module.exports = router;
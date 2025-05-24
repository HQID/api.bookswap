const express = require('express');
const router = express.Router();
const cors = require('cors');
const { getTradeRequests, getMyTrade, requestTrade, respondTrade, completeTrade, getAllTrade } = require('../controller/tradeController');

router.use(
    cors({
        credentials: true,
        origin: ['http://localhost:3003']
    })
);

router.get('/trade/all', getAllTrade);
router.get('/trade', getTradeRequests);
router.get('/trade/my', getMyTrade);
router.post('/trade/request', requestTrade);
router.patch('/trade/respond', respondTrade);
router.patch('/trade/complete', completeTrade);

module.exports = router;
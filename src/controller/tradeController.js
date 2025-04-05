
const TradeRequest =  require('../models/Trade');  

const requestTrade = async (req, res) => {
    try {
        const { requester, receiver, requesterBook, receiverBook } = req.body;

        // Pastikan user dan buku valid (validasi bisa ditambahkan)
        const trade = new TradeRequest({
            requester,
            receiver,
            requesterBook,
            receiverBook,
            status: 'pending'
        });

        await trade.save();
        res.status(201).json({ message: 'Permintaan tukar dikirim', data: trade });
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan' });
    }
};

const respondTrade = async (req, res) => {
    try {
        const { tradeId, status } = req.body; // Status: 'accepted' atau 'rejected'
        const trade = await TradeRequest.findById(tradeId);
        
        if (!trade) {
            return res.status(404).json({ error: 'Permintaan tukar tidak ditemukan' });
        }

        trade.status = status;
        await trade.save();

        res.json({ message: `Permintaan tukar ${status}`, data: trade });
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan' });
    }
};

module.exports = { requestTrade, respondTrade };

const TradeRequest =  require('../models/Trade');
const Book = require('../models/Book');

const getAllTrade = async (req, res) => {
    try {
        const trades = await TradeRequest.find({})
        res.status(200).json({ message: 'Berhasil mendapatkan semua trade', data: trades });
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan' });
    }
}

const getTradeRequests = async (req, res) => {
    try {
        const { userId } = req.body; // Ambil userId dari request body
        const trades = await TradeRequest.find({receiver: userId}).populate('requester', 'username').populate('requesterBook').populate('receiverBook');

        res.status(200).json({ message: 'Berhasil mendapatkan permintaan tukar', data: trades });
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan' });
    }
}

const getMyTrade = async (req, res) => {
    try {
        const { userId } = req.body; // Ambil userId dari request body
        const trades = await TradeRequest.find({ requester: userId }).populate('receiver', 'username').populate('requesterBook').populate('receiverBook');

        res.status(200).json({ message: 'Berhasil mendapatkan trade saya', data: trades });
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan' });
    }
}

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
        const { id, status } = req.body; // Status: 'accepted' atau 'rejected'
        const trade = await TradeRequest.findById(id);
        
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

const completeTrade = async (req, res) => {
    try {
        const { id, userId } = req.body;
        const trade = await TradeRequest.findById(id);
        const bookRequester = await Book.findById(trade.requesterBook);
        const bookReceiver = await Book.findById(trade.receiverBook);
        
        if (!trade) {
            return res.status(404).json({ error: 'Permintaan tukar tidak ditemukan' });
        }

        if (trade.status !== 'accepted') {
        return res.status(400).json({ error: 'Trade belum diterima' });
        }

        if (userId == trade.requester.toString()) {
            trade.requesterCompleted = true;
        } else if (userId == trade.receiver.toString()) {
            trade.receiverCompleted = true;
        } else {
            return res.status(403).json({ error: 'Kamu bukan bagian dari trade ini' });
        }

        // Jika keduanya sudah completed
        if (trade.requesterCompleted && trade.receiverCompleted) {
            trade.status = 'completed';
            bookRequester.status = 'exchanged';
            bookReceiver.status = 'exchanged';
        }

        await bookRequester.save();
        await bookReceiver.save();
        await trade.save();
        res.json({ message: 'Status updated', data: trade });

    } catch (e) {
        res.status(500).json({ error: 'Terjadi kesalahan' });
    }
}

module.exports = { getAllTrade, getTradeRequests, getMyTrade, requestTrade, respondTrade, completeTrade };
const Cart = require('../models/Cart');
const User = require('../models/User');

const addToCart = async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        // Cek apakah user ada
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User tidak ditemukan" });
        }

        const cart = new Cart({
            userId,
            bookId,
            status: 'wishlist'
        });

        await cart.save();
        res.status(201).json({ message: "Buku ditambahkan ke keranjang", data: cart });

    } catch(e) {
        res.status(500).json({ error: "Terjadi kesalahan" });
    }
}

const getCart = async (req, res) => {
    try {
        const { userId } = req.params;

        // Cek apakah user ada
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User tidak ditemukan" });
        }
        const cart = await Cart.find({ userId }).populate('bookId');
        res.status(200).json({ message: "Berhasil mendapatkan keranjang", data: cart });
    }
    catch(e) {
        res.status(500).json({ error: "Terjadi kesalahan" });
    }
}

const removeFromCart = async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        // Cek apakah user ada
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User tidak ditemukan" });
        }
        const cart = await Cart.findOneAndDelete({ userId, bookId });
        if (!cart) {
            return res.status(404).json({ error: "Buku tidak ditemukan di keranjang" });
        }
        res.status(200).json({ message: "Buku dihapus dari keranjang", data: cart });
    }
    catch(e) {
        res.status(500).json({ error: "Terjadi kesalahan" });
    }
}
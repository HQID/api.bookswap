const Cart = require('../models/Cart');
const User = require('../models/User');
const Book = require('../models/Book');

const addToCart = async (req, res) => {
    try {
        const { bookId } = req.body;
        const userId = req.user.id;
        // const {userId} = req.body;

        // Cek apakah user ada
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User tidak ditemukan" });
        }
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ error: "Buku tidak ditemukan" });
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
        const cart = await Cart.find({ userId: req.user.id })
            .populate({
                path: 'bookId',
                select: 'title image userId',
                populate: {
                    path: 'userId',
                    select: 'username email'
                }
            });
        res.status(200).json({ message: "Berhasil mendapatkan keranjang", data: cart });
    }
    catch(e) {
        console.error(e);
        res.status(500).json({ error: "Terjadi kesalahan" });
    }
}

const removeFromCart = async (req, res) => {
    const { id } = req.params;
    try {
        const cart = await Cart.findByIdAndDelete(id);
        if (!cart) {
            return res.status(404).json({ error: "Buku tidak ditemukan di keranjang" });
        }
        res.status(200).json({ message: "Buku dihapus dari keranjang"});
    }
    catch(e) {
        console.error(e);
        res.status(500).json({ error: "Terjadi kesalahan" });
    }
}

module.exports = {
    addToCart,
    getCart,
    removeFromCart
};
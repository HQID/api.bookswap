const axios = require('axios');
const User = require('../models/User');
const Book = require('../models/Book');

const addBook = async (req, res) => {
    try {
        const { title, author, userId, purchase } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User tidak ditemukan" });
        }

        // Query ke Google Books API berdasarkan judul dan author
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}+inauthor:${encodeURIComponent(author)}`);
        const bookData = response.data.items ? response.data.items[0].volumeInfo : null;

        if (!bookData) {
            return res.status(404).json({ error: 'Buku tidak ditemukan di Google Books API' });
        }
        
        const buku = {
            userId,
            title,
            purchase,
            description: bookData.description || "Deskripsi tidak tersedia",
            authors: bookData.authors ? bookData.authors.join(', ') : "Penulis tidak diketahui",
            publisher: bookData.publisher || "Penerbit tidak diketahui",
            isbn: bookData.industryIdentifiers ? bookData.industryIdentifiers[0].identifier : "ISBN tidak tersedia",
            languange: bookData.language || "Bahasa tidak diketahui",
            pages: bookData.pageCount || 0,
            published: bookData.publishedDate || "Tanggal terbit tidak diketahui",
            category: bookData.categories || ["Kategori tidak diketahui"],
            image: bookData.imageLinks ? bookData.imageLinks.thumbnail : null,
            location: user.city,
            status: "available"
        };

        // Ekstrak informasi dari API
        const newBook = new Book({
            userId,
            title,
            purchase,
            description: bookData.description || "Deskripsi tidak tersedia",
            authors: bookData.authors ? bookData.authors.join(', ') : "Penulis tidak diketahui",
            publisher: bookData.publisher || "Penerbit tidak diketahui",
            isbn: bookData.industryIdentifiers ? bookData.industryIdentifiers[0].identifier : "ISBN tidak tersedia",
            languange: bookData.language || "Bahasa tidak diketahui",
            pages: bookData.pageCount || 0,
            published: bookData.publishedDate || "Tanggal terbit tidak diketahui",
            category: bookData.categories || ["Kategori tidak diketahui"],
            image: bookData.imageLinks ? bookData.imageLinks.thumbnail : null,
            location: user.city,
            status: "available"
        });

        await newBook.save();

        res.status(201).json({ message: "Buku berhasil ditambahkan!", data: buku });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Terjadi kesalahan saat menambahkan buku" });
    }
};

const getBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json({ data: books });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Terjadi kesalahan saat mengambil data buku" });
    }
}

const getMyBooks = async (req, res) => {
    try {
        const books = await Book.find({ userId: req.body.userId });
        res.status(200).json({ data: books });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Terjadi kesalahan saat mengambil data buku" });
    }
}

const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findByIdAndDelete(id);
        if (!book) {
            return res.status(404).json({ error: "Buku tidak ditemukan" });
        }
        res.status(200).json({ message: "Buku berhasil dihapus" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Terjadi kesalahan saat menghapus buku" });
    }
}

module.exports = { addBook, getBooks, getMyBooks, deleteBook };

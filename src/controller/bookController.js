const axios = require('axios');
const User = require('../models/User');
const Book = require('../models/Book');

const addBook = async (req, res) => {
    try {
        const { title, author, owner, price, stock } = req.body;

        const user = await User.findById(owner);
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
            owner,
            title,
            description: bookData.description || "Deskripsi tidak tersedia",
            authors: bookData.authors ? bookData.authors.join(', ') : "Penulis tidak diketahui",
            publisher: bookData.publisher || "Penerbit tidak diketahui",
            isbn: bookData.industryIdentifiers ? bookData.industryIdentifiers[0].identifier : "ISBN tidak tersedia",
            languange: bookData.language || "Bahasa tidak diketahui",
            pages: bookData.pageCount || 0,
            published: bookData.publishedDate || "Tanggal terbit tidak diketahui",
            category: bookData.categories || ["Kategori tidak diketahui"],
            price,
            stock,
            image: bookData.imageLinks ? bookData.imageLinks.thumbnail : null,
            location: user.city
        };

        // Ekstrak informasi dari API
        // const newBook = new Book({
        //     owner,
        //     title,
        //     description: bookData.description || "Deskripsi tidak tersedia",
        //     writer: bookData.authors ? bookData.authors.join(', ') : "Penulis tidak diketahui",
        //     publisher: bookData.publisher || "Penerbit tidak diketahui",
        //     isbn: bookData.industryIdentifiers ? bookData.industryIdentifiers[0].identifier : "ISBN tidak tersedia",
        //     languange: bookData.language || "Bahasa tidak diketahui",
        //     pages: bookData.pageCount || 0,
        //     published: bookData.publishedDate || "Tanggal terbit tidak diketahui",
        //     category: bookData.categories || ["Kategori tidak diketahui"],
        //     price,
        //     stock,
        //     image: bookData.imageLinks ? bookData.imageLinks.thumbnail : null
        // });

        // await newBook.save();

        res.status(201).json({ message: "Buku berhasil ditambahkan!", data: buku });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Terjadi kesalahan saat menambahkan buku" });
    }
};

module.exports = { addBook };

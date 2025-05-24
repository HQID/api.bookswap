const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');

const MONGO_URL = process.env.MONGODB_URL;

app.use(express.json()); // Menangani request body JSON

mongoose.connect(MONGO_URL)
.then(() => {
    console.log('✅ Terhubung ke MongoDB nya Raiyan');
}).catch(err => {
    console.error('❌ Koneksi MongoDB gagal:', err);
});

app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // Menangani request body form-urlencoded

app.use('/', require('./routes/authRoutes'));
app.use('/', require('./routes/bookRoutes'))
app.use('/', require('./routes/cartRoutes'));
app.use('/', require('./routes/tradeRoutes'));


const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
})
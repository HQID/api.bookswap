const User = require('../models/User');
const {hashPassword, comparePassword} = require('../helper/auth');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const {fullname, username, gender, city, address, phone, email, password, confirmPassword} = req.body;

        if(!username) {
            return res.status(400).json({error: 'Username harus diisi'});
        }

        if(!email) {
            return res.status(400).json({error: 'Email harus diisi'});
        }

        if(!password || password.length < 8) {
            return res.status(400).json({error: 'Password harus 8 karakter atau lebih'});
        }

        if(confirmPassword !== password) {
            return res.status(400).json({error: 'Password tidak sama'});
        }

        const exist = await User.findOne({email});
        if(exist) {
            return res.status(400).json({error: 'Email sudah terdaftar'});
        }

        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            fullname,
            username,
            gender,
            city,
            address,
            phone,
            email,
            password: hashedPassword
        })

        return res.status(201).json({message: 'Registrasi berhasil', data: user});

    } catch(e) {
        console.log(e)
        res.status(500).json({error: 'Internal server error'});
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        // check user
        const user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({error: 'User tidak ditemukan'});
        }

        // check password
        const match = await comparePassword(password, user.password);
        
        if(!match) {
            return res.status(400).json({error: 'Password salah'});
        }

        return res.status(200).json({message: 'Login berhasil', data: user});

    } catch(e) {
        console.log(e)
        res.status(500).json({error: 'Internal server error'});
    }
}

const verifyUser = async (req, res) => {
    const {token} = req.cookies;
    if(!token) {
        return res.status(401).json({error: 'Unauthorized'});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(e) {
        console.log(e)
        res.status(500).json({error: 'Internal server error'});
    }
}

const logoutUser = async (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({status: true});
}

module.exports = {
    registerUser,
    loginUser,
    verifyUser,
    logoutUser
}

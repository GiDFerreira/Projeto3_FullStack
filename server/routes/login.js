const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { getUserByEmail } = require('../models/user');
const rateLimit = require('express-rate-limit');
const { checkData } = require('../helpers/authentication')

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // Limita a 5 tentativas de login por IP a cada 15 minutos
    message: 'Too many login attempts from this IP, please try again after 15 minutes',
    standardHeaders: true, 
    legacyHeaders: false,
});

router.post("/login", loginLimiter, checkData, async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    
    try{
        const user = await getUserByEmail(email); 
        console.log(user);

        if (user && await bcrypt.compare(password, user.password)) { 
            const secretKey = process.env.SECRET_KEY;
            const token = jwt.sign({ userId: user.userId }, secretKey, { expiresIn: '30m' });
            res.json({ logged: true, token: token });
        } else {
            res.status(403).json({ logged: false, message: 'Invalid email or password!' });
        }
    } catch (error) {
        res.status(500).json({ logged: false, message: 'Server error' });
    }

});

module.exports = router;

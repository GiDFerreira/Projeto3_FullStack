const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const authentication = require('../helpers/authentication');
const userService = require ('../models/user');
const router = express.Router();
const { getUserByEmail } = require('../models/user');

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await getUserByEmail(email); 
    console.log(user);
    
    try{
        if (user && await bcrypt.compare(password, user.password)) { 
            const secretKey = process.env.SECRET_KEY;
            const token = jwt.sign({ userId: userId }, secretKey, { expiresIn: '30m' });
            res.json({ logged: true, token: token });
        } else {
            res.status(403).json({ logged: false, message: 'Invalid email or password!' });
        }
    } catch (error) {
        res.status(500).json({ logged: false, message: 'Server error' });
    }

});

module.exports = router;

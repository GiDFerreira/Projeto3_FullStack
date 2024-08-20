const jwt = require('jsonwebtoken');
const express = require('express');
const authentication = require('../helpers/authentication');
const router = express.Router();

router.post("/login", authentication.checkData, authentication.validateAcess, (req, res) => {
    const { email, password } = req.body;

    if ( email != "" && email == password ) {
        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign({user: user}, secretKey, {expiresIn: '30 min'});
        res.json({ logged: true, token: token});
    } else {
        res.status(403).json({ logged: false, message:'Invalid email or password!'});
    }

})

modules.exports = router;
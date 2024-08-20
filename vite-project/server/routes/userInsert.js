const express = require('express');
const router = express.Router();
const userInsertService = require('../models/user');

//Rota install
const { sequelize } = require('../models/bd');
const userService = require('../models/user');

//Install
router.get('/install', async function(req, res, next) {
    try {
        await sequelize.sync({ force: true });

        let user1 = await userService.createUser({
            email: "email@email.com",
            senha: "senha120",
        });

        let user2 = await userService.createUser({
            email: "thisismyemail@email.com",
            senha: "password@@@",
        });

        res.json({ message: "Install with sucess!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error during installation" });
    }
});
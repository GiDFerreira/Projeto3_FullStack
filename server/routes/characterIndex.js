const express = require('express');
const router = express.Router();
const characterService = require('../models/charater');

//Salvar Personagem
router.post('/character', async (req, res) => {
    try {
        const newCharater = await characterService.createCharater(req.body);
        res.json({
            character: newCharater
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error creating character', error: error.message
        });
    }
});

//Listar personagem geral
router.get('/character', async(req,res) => {
    try{
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.limit) || 1;

        const listCharacter = await characterService.listCharacter(limit, page);
        res.json({
            character: listCharacter
        });
    } catch (error) {
        res.status(500).json({ message:'Error when listing character' })
    }
});

//Listar personagem por id
router.get('/character', async(req, res) => {
    try {
        const character = await characterService.findCharacter(req.params.id);
        if (character) {
            res.json({ character: character });
        } else {
            res.status(404).json({
                message: 'Character not found'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error getting character'
        })
    }
});

//Atualizar Personagem
router.put('/character/:id', async (req,res) => {
    try{
        const characterUpdate = await characterService.characterUpdate(req.params.id, req.body);
        if (characterUpdate) {
            res.json({ character: characterUpdate });
        } else {
            res.status(404).json({ message:'Character not found' });
        }
    } catch (error) {
        res.status(500).json({ message:'Error when updating character' });
    }
});

//Deletar personagem
router.delete('/character/:id', async (req, res) => {
    try {
        const characterDelete = await characterService.characterDelete(req.params.id);
        if (characterDelete) {
            res.json({ character: characterDelete });
        } else {
            res.status(404).json({ message:'Character not found' });
        }
    } catch (error) {
        res.status(500).json({ message:'Error when deleting character' });
    }
})

module.exports = router;
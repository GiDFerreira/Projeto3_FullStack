const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const characterService = require('../models/character');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('Destination folder:', 'uploads/');
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueFilename = Date.now() + path.extname(file.originalname);
        console.log('Generated filename:', uniqueFilename);
        cb(null, uniqueFilename); // Nome único para o arquivo
    }
});

const upload = multer({ storage: storage });


//Salvar Personagem
router.post('/', upload.single('characterImage'), async (req, res) => {
    console.log('Rota /character acessada');
    console.log('File received:', req.file);
    console.log('Body received:', req.body);
    try {
        const { characterName, series, movies } = req.body;
        const imagePath = req.file ? req.file.path : null;

        // Logs para verificar os dados recebidos
        console.log('Nome do Personagem:', characterName);
        console.log('Filmes:', movies);
        console.log('Séries:', series);
        console.log('Caminho da Imagem:', imagePath);

        if (!characterName || !series || !movies) {
            throw new Error('Missing required fields.');
        }
        
        const characterData = {
            characterName: req.body.characterName,  // Deve bater com o campo esperado
            image: req.file.path,  // Verifique se o path está correto
            series: req.body.series,
            movies: req.body.movies,
        };

        const newCharacter = await characterService.createCharacter(characterData);
        res.status(201).json({ message: 'Character added successfully!', character: newCharacter });
        console.log('Personagem criado:', newCharacter);
        
    } catch (error) {
        console.error('Error creating character:', error);
        res.status(400).json({
            message: 'Error creating character', error: error.message
        });
    }
});

//Listar personagem geral
router.get('/', async(req,res) => {
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
router.get('/:id', async(req, res) => {
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
router.put('/:id', async (req,res) => {
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
router.delete('/:id', async (req, res) => {
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
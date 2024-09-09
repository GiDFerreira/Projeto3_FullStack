const { characterModel } = require('./bd');

const allowedLimits = [5, 10, 30];

module.exports = {
    async createCharacter(characterData) {
        try {
            // Certifique-se de que os campos correspondem ao modelo do Sequelize
            console.log('Dados recebidos para criação do personagem:', characterData);

            const character = await characterModel.create({
                characterName: characterData.characterName,  // Ajuste conforme o campo correto no seu modelo
                image: characterData.image,
                series: characterData.series,
                movies: characterData.movies,
            });

            console.log('Personagem criado no banco de dados:', character);
            return character;
            
        } catch (error) {
            console.error('Erro ao salvar no banco de dados:', error.message);
            throw error; // Lança o erro para ser tratado na camada superior
        }
    },

    async findCharacter(id) {
        const character = await characterModel.findByPk(id);
        return character;
    },

    async listCharacter() {
        try {
            // Retorna todos os personagens do banco de dados
            const characters = await characterModel.findAll();
            return characters;
        } catch (error) {
            console.error('Erro ao listar personagens:', error.message);
            throw error;
        }
    },

    /*async updateCharacter(characterId, newData) {
        const [update] = await characterModel.update(newData, {
            where: { id:characterId },
        });

        if (update > 0) {
            const characterUpdated = await characterModel.findByPk(characterId);
            return characterUpdated;
        }

        return null;
    },

    async deleteCharacter(characterId) {
        const characterDeleted = await characterModel.destroy({
            where: { id:characterId }
        });

        return characterDeleted;
    },*/

};
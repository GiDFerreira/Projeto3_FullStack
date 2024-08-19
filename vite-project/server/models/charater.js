const { characterModel } = require('./bd');

const allowedLimits = [5, 10, 30];

modules.exports = {
    async createCharacter(characterData) {
        const character = await characterModel.create(characterData);
        return character;
    },

    async listCharacter(limit = 10, page = 1) {
        if(!allowedLimits.includes(limit)){
            throw new Error('Invalid limit. Allowed values: 5, 10, 30 ');
        }

        const offset = (page - 1) * limit;
        const character = await characterModel.findAll({
            limit: limit,
            offset: offset,
        });

        return character;
    },

    async findCharacter(id) {
        const character = await characterModel.findByPk(id);
        return character;
    },

    async updateCharacter(characterId, newData) {
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
    },

};
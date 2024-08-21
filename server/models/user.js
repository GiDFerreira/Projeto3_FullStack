const bcrypt = require('bcrypt');
const { userModel } = require('./bd');

modules.exports = {
    async createUser(userData) {
        
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

        const user = await userModel.create({
            ...userData,
            password: hashedPassword,
        });

        return user;
        
    },

    async getUserByEmail(email) {
        return await UsuarioModel.findOne({ where: { email } });
    },
};
const bcrypt = require('bcrypt');
const { userModel, sequelize } = require('./bd');

module.exports = {
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
        return await userModel.findOne({ where: { email } });
    },
    
    async initializeUsers(req, res) {
        try {
            await sequelize.sync({ force: true });  // Sincroniza o banco de dados

            let user1 = await this.createUser({
                email: "email@email.com",
                password: "senha120",  // Altere 'senha' para 'password'
            });

            let user2 = await this.createUser({
                email: "thisismyemail@email.com",
                password: "password@@@",  // Altere 'senha' para 'password'
            });

            res.json({ message: "Install with success!" });
            console.log(user2);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error during installation" });
        }
    }
};

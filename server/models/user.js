// no arquivo './db.js' ou onde você define e exporta a função
const bcrypt = require('bcrypt');
const { userModel, sequelize } = require('./bd');

async function createUser(userData) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    const user = await userModel.create({
        ...userData,
        password: hashedPassword,
    });

    return user;
}

async function getUserByEmail(email) {
    return await userModel.findOne({ where: { email } });
}

async function initializeUsers() {
    try {
        await sequelize.sync({ force: true });  // Sincroniza o banco de dados

        let user1 = await createUser({
            email: "email@email.com",
            password: "senha120",
        });

        let user2 = await createUser({
            email: "thisismyemail@email.com",
            password: "password@@@",
        });

        console.log("Users created successfully: ", user1, user2);
    } catch (error) {
        console.error("Error during installation", error);
        throw error;  // Lance o erro para ser capturado na chamada
    }
}

module.exports = {
    createUser,
    getUserByEmail,
    initializeUsers,  // Certifique-se de exportar a função
};

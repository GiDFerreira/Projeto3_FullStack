const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    pool: {
        max: 10, //Máx de conexões no pool
        min: 0,  //Min de conexões no pool
        acquire: 30000, //Temp máx em milissegundos q o pool vai tentar pegar uma conexão antes de gerar erro
        idle: 10000, //Temp q uma conexão pode ficar ociosa antes de ser liberada
    }
});

// Definição do modelo de usuário
const userModel = sequelize.define('User', {
    idUser: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Definição do modelo de personagem
const characterModel = sequelize.define('Character', {
    idCharacter: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    characterName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'default.png',
    },
    series: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    movies: {
        type: DataTypes.JSON,
        allowNull: false,
    }
});

// Definição do relacionamento entre User e Character
characterModel.belongsTo(userModel);  // Cada personagem pertence a um usuário
userModel.hasMany(characterModel);    // Um usuário pode ter muitos personagens

// Sincronização com o banco de dados
sequelize.sync({ alter: false })
    .then(() => {
        console.log('Models synchronized with the database.');
    })
    .catch((err) => {
        console.error('Error synchronizing models with the database:', err);
    });

module.exports = {
    sequelize: sequelize,
    userModel: userModel,
    characterModel: characterModel,
};

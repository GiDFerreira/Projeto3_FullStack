const { userModel } = require('./bd');

modules.exports = {
    async createUser(userData) {
        const user = await userModel.create(userData);
        return user;
    }
};
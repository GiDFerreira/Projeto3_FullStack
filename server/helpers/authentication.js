const jwt = require('jsonwebtoken');

module.exports = {
    validateAcess: (req, res, next) => {
        const userToken = req.headers['authorization'] || "";
        const token = userToken && userToken.split(" ")[1];

        if (!userToken) {
            return res.status(401).json({ message: 'Token not inserted'});
        }

        if (!token) {
            return res.status(401).json({ message: 'You are not allowed' });
        }
        try {
            const secret = process.env.SECRET;
            jwt.verify(token, secret);
            next();
        } catch (error) {
            res.status(400).json({ message: 'Invalid token!' });
        }
    },

    checkData(req, res, next) {
        const { email, password } = req.body;
        if (!email) {
            return res.status(422).json({ message: 'Error: Enter your email ' });
        }
        if (!password) {
            return res.status(422).json({ message: 'Error: Enter your password' });
        }
        next();
    }
};
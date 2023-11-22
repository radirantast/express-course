const User = require('../database/schemas/User');
const { hashPassword } = require('../utils/helpers');

async function authRegisterController(req, res) {
    const { email, password } = req.body;

    const userDB = await User.findOne({ email });

    if (userDB) {
        return res.sendStatus(400);
    } else {
        const hashedPassword = await hashPassword(password);
        const newUser = await User.create({ email, password: hashedPassword });
        return res.sendStatus(201);
    }
};

module.exports = { authRegisterController };
const bcrypt = require('bcryptjs');

async function hashPassword(password) {
    const salt = await bcrypt.genSaltSync();
    const hashing = await bcrypt.hashSync(password, salt);
    return hashing;
};

async function comparePassword(raw, hash) {
    const bcCryptCompare = await bcrypt.compare(raw, hash);
    return bcCryptCompare;
};

module.exports = {
    hashPassword,
    comparePassword
};
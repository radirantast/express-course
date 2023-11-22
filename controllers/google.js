const GoogleUser = require('../database/schemas/googleSchema');

async function googleAuthRegisterController(accessToken, refreshToken, profile, done) {
    try {
        const googleUser = await GoogleUser.findOne({ googleId: profile.id });
        if (googleUser) {
            return done(null, googleUser);
        } else {
            const newUser = await GoogleUser.create({
                googleId: profile.id,
                displayName: profile.displayName
            });
            return done(null, newUser);
        }
    } catch (err) {
        console.log(err);
        return done(err);
    }
};

module.exports = { googleAuthRegisterController };
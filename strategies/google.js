const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleUser = require('../database/schemas/googleSchema');
const googleAuthRegisterController = require('../controllers/google');

passport.serializeUser((user, done) => {
    console.log('Serealizing user...');
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log('Deserealizing user...');
    console.log(id);
    try {
        const user = await GoogleUser.findById(id);
        if (!user) throw new Error('User no found');
        done(null, user);
    } catch (err) {
        console.log(err);
        done(err);
    }
});

passport.use(
    new GoogleStrategy({
        clientID: '339484366346-eifekdl8me0375oisfp621b53v1l3cka.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:3000/v1/auth/google/redirect',
        scope: ['profile'],
    }, googleAuthRegisterController
));

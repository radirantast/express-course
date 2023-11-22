const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../database/schemas/User');
const { comparePassword } = require('../utils/helpers');

passport.serializeUser((user, done) => {
    console.log('Serealizing user...');
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log('Deserealizing user...');
    console.log(id);
    try {
        const user = await User.findById(id);
        if (!user) throw new Error('User no found');
        done(null, user);
    } catch (err) {
        console.log(err);
        done(err);
    }
});

passport.use(
    new LocalStrategy({
        usernameField: 'email',
    },
        async (email, password, done) => {
            console.log(email);
            console.log(password);
            if (!email || !password) {
                throw new Error('Missing credentials')
            }
            try {
                const userDB = await User.findOne({ email });
                if (!userDB) throw new Error('User not found');
                const isValid = await comparePassword(password, userDB.password);
                if (isValid) {
                    done(null, userDB);
                } else {
                    done(null, null);
                };
            } catch (err) {
                done(err, null);
            }
        })
);
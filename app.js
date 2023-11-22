const express = require('express');
const path = require('path');
const { json } = require('sequelize');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
// require('./strategies/services');
require('./strategies/google');

//! Routes
const groc = require('./groc');
const searchbar = require('./searchbar');
const cart = require('./cart');
const auth = require('./auth')
const cookieParser = require('cookie-parser');
const { mongo } = require('mongoose');

require('./database');

const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname));

app.use(express.json());

app.use(cookieParser());
app.use(session({
    secret: 'sdfsdf',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://retardasf:Nikole060315@retardasf.zlppfpm.mongodb.net/',
    })
}));

app.use((req, res, next) => {
    console.log(`${req.method}:${req.url}`);

    next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/', searchbar);
app.use('/v1/groceries', groc);
app.use('/v1/cart', cart);
app.use('/v1/auth', auth);  

app.listen(PORT, () => {
    console.log('Server ----- http://localhost:3000');
});
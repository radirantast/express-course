const mongoose = require('mongoose');

mongoose
    .connect('mongodb+srv://retardasf:Nikole060315@retardasf.zlppfpm.mongodb.net/')
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err));
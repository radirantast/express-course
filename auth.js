const { Router } = require('express');
const User = require('./database/schemas/User');
const passport = require('passport');
const { hashPassword, comparePassword } = require('./utils/helpers');
const { authRegisterController } = require('./controllers/auth');

const router = Router();

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) return res.send(400);
//   const userDB = await User.findOne({ email });
//   if (!userDB) return res.send(401);
//   const isValid = await comparePassword(password, userDB.password);
//   if (isValid) {
//     req.session.user = userDB;
//     return res.sendStatus(200);
//   } else {
//     return res.sendStatus(401);
//   };
// });

router.post('/login', passport.authenticate('local'), async (req, res) => {
  res.sendStatus(200);
});

router.post('/registry', authRegisterController);

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.sendStatus(200);
});

router.post('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
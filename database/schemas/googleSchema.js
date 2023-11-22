const mongoose = require('mongoose');

const GoogleUserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('google_users', GoogleUserSchema);
// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String },
  city: { type: String },
  pincode: { type: String },
  phone: { type: String },
});

module.exports = mongoose.model('User', UserSchema);

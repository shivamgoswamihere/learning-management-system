const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['learner', 'trainer', 'admin', 'examinee'], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserModel', userSchema);

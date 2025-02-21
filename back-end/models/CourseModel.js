const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    price: { type: Number }
  });

module.exports = mongoose.model('CourseModel', courseSchema);

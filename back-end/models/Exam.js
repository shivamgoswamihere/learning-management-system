const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    questions: { type: Array, required: true },
    passingMarks: { type: Number }
  });

module.exports = mongoose.model('Exam', examSchema);

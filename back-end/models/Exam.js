const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: String,
    options: [String],
    correctAnswer: String,
    marks: Number,
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
    explanation: String
});

const examSchema = new mongoose.Schema({
    title: { type: String, required: true },
    code: { type: String, unique: true, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true },
    category: { type: String, required: true },
    timeLimit: { type: Number, required: true },
    totalMarks: { type: Number, required: true },
    passingMarks: { type: Number, required: true },
    examType: { type: String, enum: ['Practice Test', 'Certification Exam'], required: true },
    questions: [questionSchema],
    isShuffled: { type: Boolean, default: false },
    timeSections: [{ sectionName: String, duration: Number }],
    accessCode: { type: String },
    expiryDate: { type: Date },
    attemptLimit: { type: Number, default: 1 },
    restrictCopyPaste: { type: Boolean, default: true }
});

module.exports = mongoose.model('Exam', examSchema);
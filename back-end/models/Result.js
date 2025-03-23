// models/Result.js
const mongoose = require("mongoose");

// const resultSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
//   obtainedMarks: Number,
//   correctAnswers: Number,
//   incorrectAnswers: Number,
//   totalQuestions: Number,
//   percentage: Number,
//   passed: Boolean,
//   submittedAt: { type: Date, default: Date.now },
// });
const resultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
  obtainedMarks: Number,
  correctAnswers: Number,
  incorrectAnswers: Number,
  totalQuestions: Number, // ✅ Required
  percentage: Number,
  passed: Boolean,
  certificateUrl: { type: String }, // ✅ Store Cloudinary URL
  submittedAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Result", resultSchema);

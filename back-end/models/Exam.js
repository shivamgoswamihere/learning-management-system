const mongoose = require("mongoose");
const examSchema = new mongoose.Schema({
  title: String,
  code: String,
  subject: String,
  category: String,
  timeLimit: Number,
  numQuestions: Number,
  totalMarks: Number,
  type: { type: String, enum: ["Practice Test", "Certification Exam"] },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  randomized: Boolean,
  sections: [{ name: String, timeLimit: Number }],
  accessCodes: [String],
  expiryDate: Date,
  attemptsLimit: Number,
  restrictCopyPaste: Boolean,
});
module.exports = mongoose.model("Exam", examSchema);
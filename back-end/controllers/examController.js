const Exam = require("../models/Exam");
const Question = require("../models/Question");

exports.createExam = async (req, res) => {
  if (req.user.role !== "trainer") return res.status(403).json({ error: "Only trainers can create exams" });
  try {
    const exam = new Exam({ ...req.body, createdBy: req.user.id });
    await exam.save();
    res.status(201).json(exam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addQuestions = async (req, res) => {
  if (req.user.role !== "trainer") return res.status(403).json({ error: "Only trainers can add questions" });
  try {
    const { examId, questions } = req.body;
    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ error: "Exam not found" });
    const questionDocs = questions.map(q => ({ ...q, exam: examId }));
    await Question.insertMany(questionDocs);
    res.status(201).json({ message: "Questions added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate("questions");
    res.json(exams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
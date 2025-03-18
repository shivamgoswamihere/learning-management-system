const Exam = require("../models/Exam");
const Question = require("../models/Question");

  
exports.createExam = async (req, res) => {
  console.log("API Hit - Create Exam");
  console.log("Request Headers:", req.headers);  // Check if token is sent
  console.log("Request Body:", req.body);        // Check if data is received

  if (!req.user) {
      console.log("Error: req.user is undefined"); // Debugging log
      return res.status(403).json({ error: "Unauthorized request" });
  }

  if (req.user.role !== "trainer") {
      return res.status(403).json({ error: "Only trainers can create exams" });
  }

  try {
      const exam = new Exam({ ...req.body, createdBy: req.user.id });
      await exam.save();
      console.log("Exam saved:", exam); // Debugging log
      res.status(201).json(exam);
  } catch (err) {
      console.error("Database error:", err.message); // Debugging log
      res.status(500).json({ error: err.message });
  }
};

exports.addQuestions = async (req, res) => {
  if (req.user.role !== "trainer") {
    return res.status(403).json({ error: "Only trainers can add questions" });
  }

  try {
    const { examId, questions } = req.body;
    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ error: "Exam not found" });

    const questionDocs = await Question.insertMany(
      questions.map((q) => ({ ...q, exam: examId }))
    );

    // ✅ Link questions to the Exam
    exam.questions.push(...questionDocs.map((q) => q._id));
    await exam.save(); // ✅ Ensure questions are added to the exam

    res.status(201).json({ message: "Questions added successfully", questions: questionDocs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate({
      path: "questions", // Ensure it fetches related questions
      model: "Question",
    });

    console.log("Fetched Exams with Questions:", exams); // Debugging
    res.json(exams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getExamQuestions = async (req, res) => {
  try {
    const { examId } = req.params;
    
    const exam = await Exam.findById(examId).populate("questions");
    if (!exam) return res.status(404).json({ error: "Exam not found" });

    res.json(exam.questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

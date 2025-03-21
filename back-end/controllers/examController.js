const Exam = require("../models/Exam");
const Question = require("../models/Question");
const User = require("../models/User");
const Result = require("../models/Result");
  
exports.createExam = async (req, res) => {
 

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

exports.enrollExam = async (req, res) => {
  try {
      const { examId } = req.params;
      const userId = req.user.id;

      // ✅ Find the exam by ID
      const exam = await Exam.findById(examId);
      if (!exam) {
          return res.status(404).json({ success: false, message: "Exam not found" });
      }

      // ✅ Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ success: false, message: "User not found" });
      }

      // ✅ Check if user is a learner or examinee (Fixed Condition)
      if (user.role !== "learner" && user.role !== "examinee") {
          return res.status(403).json({ success: false, message: "Only learners and examinees can enroll in exams" });
      }

      // ✅ Check if already enrolled
      if (user.enrolledExams.includes(examId)) {
          return res.status(400).json({ success: false, message: "Already enrolled in this exam" });
      }

      // ✅ Enroll user in the exam
      user.enrolledExams.push(examId);
      await user.save();

      return res.status(200).json({
          success: true,
          message: "Enrolled in exam successfully",
          enrolledExams: user.enrolledExams
      });

  } catch (error) {
      console.error("Error enrolling in exam:", error);
      return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getEnrolledExams = async (req, res) => {
  try {
      const userId = req.user.id;

      // ✅ Get the user with enrolled exams populated
      const user = await User.findById(userId)
          .populate({
              path: "enrolledExams",
              select: "title description category trainer",
              populate: { path: "trainer", select: "fullName" } // Fetch trainer details
          })
          .select("fullName enrolledExams");

      if (!user) {
          return res.status(404).json({ success: false, message: "User not found" });
      }

      return res.status(200).json({
          success: true,
          message: "Enrolled exams fetched successfully",
          enrolledExams: user.enrolledExams
      });

  } catch (error) {
      console.error("Error fetching enrolled exams:", error);
      return res.status(500).json({ success: false, message: error.message });
  }
};

exports.submitResult = async (req, res) => {
  try {
    const { examId, result } = req.body;

    if (!result || !examId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { obtainedMarks, correct, incorrect, selectedAnswers, totalQuestions } = result;

    if (
      obtainedMarks === undefined ||
      correct === undefined ||
      incorrect === undefined ||
      totalQuestions === undefined
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newResult = new Result({
      user: req.user.id,
      exam: examId,
      obtainedMarks,
      correctAnswers: correct,
      incorrectAnswers: incorrect,
      totalQuestions,
      percentage: (correct / totalQuestions) * 100,
      passed: obtainedMarks >= 40,
    });

    await newResult.save();
    res.status(201).json({ message: "Result submitted successfully", result: newResult });
  } catch (error) {
    console.error("Error submitting result:", error);
    res.status(500).json({ error: error.message });
  }
};


// ✅ Fetch submitted results for a user
// exports.getSubmittedResults = async (req, res) => {
//   try {
//     const results = await Result.find({ user: req.user.id })
//       .populate("exam", "title code subject totalMarks") // Populate exam details
//       .sort({ createdAt: -1 }); // Sort by most recent

//     if (!results || results.length === 0) {
//       return res.status(404).json({ message: "No results found." });
//     }

//     res.status(200).json(results);
//   } catch (error) {
//     console.error("Error fetching results:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getSubmittedResults = async (req, res) => {
//   try {
//     const results = await Result.find({ user: req.user.id })
//       .populate("exam", "title code subject totalMarks")
//       .sort({ createdAt: -1 });

//     if (!results || results.length === 0) {
//       return res.status(404).json({ message: "No results found." });
//     }

//     // ✅ Map results to include examTitle and other required fields
//     const formattedResults = results.map((result) => ({
//       _id: result._id,
//       examTitle: result.exam?.title || "Unknown Exam", // ✅ Include exam title
//       score: result.score || 0, // ✅ Default to 0 if score is missing
//       submittedAt: result.createdAt,
//     }));

//     res.status(200).json(formattedResults);
//   } catch (error) {
//     console.error("Error fetching results:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

exports.getSubmittedResults = async (req, res) => {
  try {
    const results = await Result.find({ user: req.user.id })
      .populate("exam", "title code subject totalMarks")
      .sort({ createdAt: -1 });

    if (!results || results.length === 0) {
      return res.status(404).json({ message: "No results found." });
    }

    // ✅ Map results to include correct fields
    const formattedResults = results.map((result) => ({
      _id: result._id,
      examTitle: result.exam?.title || "Unknown Exam",
      obtainedMarks: result.obtainedMarks || 0, // ✅ Include obtained marks
      correctAnswers: result.correctAnswers || 0,
      incorrectAnswers: result.incorrectAnswers || 0,
      totalQuestions: result.totalQuestions || 0,
      percentage: result.percentage || 0,
      passed: result.passed || false,
      submittedAt: result.submittedAt || result.createdAt,
    }));

    res.status(200).json(formattedResults);
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({ error: error.message });
  }
};

const express = require("express");
const { createExam, addQuestions, getAllExams, getExamQuestions,enrollExam, getEnrolledExams } = require("../controllers/examController");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", protect(["trainer","admin"]), createExam);
router.post("/add-questions", protect(["trainer","admin"]), addQuestions);
router.get("/all", protect(["trainer", "examinee","admin","learner"]), getAllExams);

// ✅ New Route: Fetch questions for a specific exam
router.get("/:examId/questions", protect(["trainer", "examinee","admin","learner"]), getExamQuestions);

// ✅ Enroll in a Course (Learner Only)
router.post("/enroll/:examId", protect(["learner","examinee"]), enrollExam);

// ✅ Get Enrolled Courses for Learner
router.get("/enrolledExam", protect(["learner","examinee"]), getEnrolledExams);

module.exports = router;

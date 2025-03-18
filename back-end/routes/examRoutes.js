const express = require("express");
const { createExam, addQuestions, getAllExams, getExamQuestions } = require("../controllers/examController");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", protect(["trainer"]), createExam);
router.post("/add-questions", protect(["trainer"]), addQuestions);
router.get("/all", protect(["trainer", "examinee"]), getAllExams);

// ✅ New Route: Fetch questions for a specific exam
router.get("/:examId/questions", protect(["trainer", "examinee"]), getExamQuestions);

module.exports = router;

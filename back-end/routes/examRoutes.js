const express = require("express");
const { createExam, addQuestions, getAllExams, getExamQuestions } = require("../controllers/examController");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", protect(["trainer","admin"]), createExam);
router.post("/add-questions", protect(["trainer","admin"]), addQuestions);
router.get("/all", protect(["trainer", "examinee","admin"]), getAllExams);

// ✅ New Route: Fetch questions for a specific exam
router.get("/:examId/questions", protect(["trainer", "examinee","admin"]), getExamQuestions);

module.exports = router;

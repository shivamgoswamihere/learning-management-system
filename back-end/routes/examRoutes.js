const express = require("express");
const { createExam, addQuestions, getAllExams } = require("../controllers/examController");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", protect, createExam);
router.post("/add-questions", protect, addQuestions);
router.get("/all", protect, getAllExams);

module.exports = router;
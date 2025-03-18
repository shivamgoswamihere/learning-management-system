const express = require("express");
const { createExam, addQuestions, getAllExams } = require("../controllers/examController");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", protect(["trainer"]), createExam);
router.post("/add-questions", protect(["trainer"]), addQuestions);
router.get("/all", protect(["trainer","learner"]), getAllExams);

module.exports = router;
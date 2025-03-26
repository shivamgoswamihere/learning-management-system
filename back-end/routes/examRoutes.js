const express = require("express");
const { 
    createExam, 
    addQuestions, 
    getAllExams, 
    getExamQuestions,
    enrollExam, 
    getEnrolledExams,
    submitResult,
    getSubmittedResults,
    getCreatedExams,
    generateCertificate // ✅ Import the certificate function
} = require("../controllers/examController");

const protect = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", protect(["trainer", "admin"]), createExam);
router.post("/add-questions", protect(["trainer", "admin"]), addQuestions);
router.get("/all", protect(["trainer", "examinee", "admin", "learner"]), getAllExams);

// ✅ Fetch questions for a specific exam
router.get("/:examId/questions", protect(["trainer", "examinee", "admin", "learner"]), getExamQuestions);

// ✅ Enroll in an Exam (Learner or Examinee)
router.post("/enroll/:examId", protect(["learner", "examinee"]), enrollExam);

// ✅ Get Enrolled Exams for a Learner or Examinee
router.get("/enrolledExam", protect(["learner", "examinee"]), getEnrolledExams);

// ✅ Submit Exam Result
router.post("/submit-result", protect(["learner", "examinee"]), submitResult);

// ✅ Get Submitted Results for a User
router.get("/submitted-results", protect(["learner", "examinee", "trainer"]), getSubmittedResults);

// ✅ Get Exams Created by Trainer/Admin
router.get("/created-exams", protect(["trainer", "admin"]), getCreatedExams);

// ✅ New Route: Generate & Download Certificate (Only for Passed Students)
router.get("/:examId/certificate", protect(["learner", "examinee","trainer","admin"]), generateCertificate);

module.exports = router;

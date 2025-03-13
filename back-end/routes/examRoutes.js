const express = require("express");
const router = express.Router();
const examController = require("../controllers/examController");
const { uploadCSV } = require("../middlewares/multerConfig"); // ✅ Import CSV upload middleware

router.post("/create", examController.createExam);
router.post("/:examId/add-questions", examController.addQuestions);
router.post("/:examId/upload-questions-csv", uploadCSV, examController.uploadQuestionsCSV); // ✅ Use Cloudinary-based CSV upload
router.get("/:examId", examController.getExam);
router.post("/:examId/submit", examController.submitExam);
router.post("/:examId/access-control", examController.controlExamAccess);

module.exports = router;

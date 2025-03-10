const express = require("express");
const { uploadCourseFiles } = require("../middlewares/multerConfig");
const { createCourse, getCourse, getAllCourses } = require("../controllers/courseController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

// ✅ Create Course (Trainer Only)
router.post(
    "/create-course",
    protect(["trainer"]),
    uploadCourseFiles,
    createCourse
);

// ✅ Get All Courses (Public)
router.get("/all-courses", getAllCourses);

// ✅ Get Single Course by ID (Logged-in Users Only)
router.get("/:id", protect(), getCourse);

module.exports = router;

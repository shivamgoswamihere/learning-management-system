const express = require("express");
const { uploadCourseFiles } = require("../middlewares/multerConfig");
const { 
    createCourse, 
    getCourse, 
    getAllCourses, 
    getTrainerCourses,
    updateCourse
} = require("../controllers/courseController");
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

// ✅ Get Trainer's Courses (Trainer Only)
router.get("/trainer", protect(["trainer"]), getTrainerCourses);

// ✅ Get Single Course by ID (Logged-in Users Only) use protect()
router.get("/:id", getCourse);
router.put("/:courseId", protect(["admin", "trainer"]), updateCourse);

module.exports = router;

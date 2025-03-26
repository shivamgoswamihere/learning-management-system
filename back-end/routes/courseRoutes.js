const express = require("express");
const { uploadCourseFiles } = require("../middlewares/multerConfig");
const { 
    createCourse, 
    getCourse, 
    getAllCourses, 
    getTrainerCourses,
    updateCourse,
    enrollCourse, 
    getEnrolledCourses 
} = require("../controllers/courseController");
const protect = require("../middlewares/authMiddleware");
const mongoose = require("mongoose");

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
router.get("/trainer", protect(["trainer","admin"]), getTrainerCourses);

// ✅ Enroll in a Course (Learner Only)
router.post("/enroll/:courseId", protect(["learner","trainer","admin","examinee"]), enrollCourse);

// ✅ Get Enrolled Courses for Learner
router.get("/enrolled", protect(["learner","trainer","admin","examinee"]), getEnrolledCourses);


// ✅ Update Course (Admin or Trainer Only)
router.put("/:courseId", protect(["admin", "trainer"]), updateCourse);

// ✅ Get Single Course by ID (Logged-in Users Only)
router.get("/:id", async (req, res, next) => {
    const { id } = req.params;

    // Validate if the ID is a valid ObjectId
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, message: "Invalid course ID" });
    }
    next();
}, getCourse);

module.exports = router;

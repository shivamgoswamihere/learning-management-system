const express = require("express");
const { createCourse, getCourses, approveCourse } = require("../controllers/courseController");
// const { verifyAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/create", createCourse); // Trainer creates course
router.get("/", getCourses); // Get all courses
// router.put("/approve/:id", verifyAdmin, approveCourse); // Admin approves course

module.exports = router;

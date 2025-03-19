const User = require("../models/User");
const Course = require("../models/Course");
const Exam = require("../models/Exam");

/**
 * @desc Get Total Counts for Users, Courses, and Exams
 * @route GET /api/admin/stats
 * @access Private (Admin only)
 */
const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalExams = await Exam.countDocuments();

    res.json({ totalUsers, totalCourses, totalExams });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ message: "Failed to fetch admin stats" });
  }
};

module.exports = { getAdminStats };

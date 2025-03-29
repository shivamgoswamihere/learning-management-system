const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const User = require("../models/User");

// ✅ Create Course (Trainers Only, Requires Admin Approval)
const createCourse = async (req, res) => {
    try {
        const { 
            title, description, category, price, duration, prerequisites, 
            courseLevel, certificationAvailable, syllabus: syllabusRaw 
        } = req.body;
        
        const lessons = Array.isArray(req.body.lessons) 
            ? req.body.lessons 
            : JSON.parse(req.body.lessons || "[]");

        // ✅ Ensure user is a trainer
        const trainer = await User.findById(req.user.id);
        if (!trainer || trainer.role !== "trainer") {
            return res.status(403).json({ success: false, message: "Only trainers can create courses" });
        }

        // ✅ Upload Files (Multer)
        const thumbnail = req.files?.thumbnail?.[0]?.path || null;

        // ✅ Validate Inputs
        if (!title || !description || !category || !price || !duration || !courseLevel || !thumbnail) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // ✅ Parse & Validate Syllabus
        let syllabus = [];
        try {
            syllabus = Array.isArray(syllabusRaw) ? syllabusRaw : JSON.parse(syllabusRaw || "[]");
            syllabus.forEach(item => {
                if (!item.title || !item.description) {
                    throw new Error("Each syllabus item must have a title and description.");
                }
            });
        } catch (err) {
            return res.status(400).json({ success: false, message: "Invalid syllabus format: " + err.message });
        }

        // ✅ Create Course (Pending Approval)
        const course = new Course({
            title,
            description,
            category,
            trainer: trainer._id,
            thumbnail,
            price,
            duration,
            prerequisites,
            courseLevel,
            certificationAvailable,
            syllabus,
            status: "pending" // Requires admin approval
        });

        await course.save();

        return res.status(201).json({
            success: true,
            message: "Course created successfully and is pending admin approval",
            course
        });

    } catch (error) {
        console.error("Error creating course:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Approve or Reject Course (Admins Only)
const updateCourseApproval = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { status, rejectionReason } = req.body;

        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Only admins can approve or reject courses" });
        }

        if (!["approved", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        if (status === "rejected" && !rejectionReason) {
            return res.status(400).json({ message: "Rejection reason is required" });
        }

        course.status = status;
        course.approvedBy = req.user.id;
        course.approvalDate = new Date();
        course.rejectionReason = status === "rejected" ? rejectionReason : null;

        await course.save();

        return res.status(200).json({
            success: true,
            message: `Course ${status} successfully`,
            course
        });

    } catch (error) {
        console.error("Error updating course approval:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get All Approved Courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({ status: "approved" })
            .populate("trainer", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "All approved courses fetched successfully",
            courses
        });

    } catch (error) {
        console.error("Error fetching courses:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get Pending Courses (Admins Only)
const getPendingCourses = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Only admins can view pending courses" });
        }

        const courses = await Course.find({ status: "pending" }).populate("trainer", "name email");
        return res.status(200).json({ success: true, courses });

    } catch (error) {
        console.error("Error fetching pending courses:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

const getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate("lessons")
            .populate("trainer", "name email");

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        // Ensure only approved courses are accessible
        if (course.status !== "approved" && req.user.role !== "admin" && req.user.id !== course.trainer.toString()) {
            return res.status(403).json({ success: false, message: "This course is not available" });
        }

        res.status(200).json({ success: true, course });
    } catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const updates = req.body; // Get updated course data

        // Ensure only the trainer who created it or an admin can update
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        if (req.user.role !== "admin" && course.trainer.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to update this course" });
        }

        // Perform update
        const updatedCourse = await Course.findByIdAndUpdate(courseId, updates, { new: true });

        res.status(200).json({ message: "Course updated successfully", course: updatedCourse });
    } catch (error) {
        res.status(500).json({ message: "Failed to update course", error: error.message });
    }
};
const deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        // ✅ Find course by ID
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        // ✅ Ensure only the trainer who created it or an admin can delete
        if (req.user.role !== "admin" && course.trainer.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "Unauthorized to delete this course" });
        }

        // ✅ Delete associated lessons first
        await Lesson.deleteMany({ course: courseId });

        // ✅ Delete the course
        await Course.findByIdAndDelete(courseId);

        return res.status(200).json({ success: true, message: "Course deleted successfully" });
    } catch (error) {
        console.error("Error deleting course:", error);
        return res.status(500).json({ success: false, message: "Failed to delete course", error: error.message });
    }
};


const getTrainerCourses = async (req, res) => {
    try {
        const trainerId = req.user.id;

        const trainer = await User.findById(trainerId);
        if (!trainer || trainer.role !== "trainer") {
            return res.status(403).json({ success: false, message: "Only trainers can access their courses" });
        }

        const courses = await Course.find({ trainer: trainerId, status: "approved" })
            .populate("lessons");

        return res.status(200).json({
            success: true,
            courses,
        });

    } catch (error) {
        console.error("Error fetching trainer courses:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

const enrollCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user.id;

        // ✅ Find the course by ID
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        // ✅ Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // ✅ Check if user is a learner
        if (user.role !== "learner") {
            return res.status(403).json({ success: false, message: "Only learners can enroll in courses" });
        }

        // ✅ Check if already enrolled
        if (user.enrolledCourses.includes(courseId)) {
            return res.status(400).json({ success: false, message: "Already enrolled in this course" });
        }

        // ✅ Enroll user in the course
        user.enrolledCourses.push(courseId);
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Enrolled in course successfully",
            enrolledCourses: user.enrolledCourses
        });

    } catch (error) {
        console.error("Error enrolling in course:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
const getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;

        // ✅ Get the user with enrolled courses populated
        const user = await User.findById(userId)
            .populate("enrolledCourses", "title description category trainer")
            .select("fullName enrolledCourses");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Enrolled courses fetched successfully",
            enrolledCourses: user.enrolledCourses
        });

    } catch (error) {
        console.error("Error fetching enrolled courses:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createCourse,
    getAllCourses,
    getCourse,
    deleteCourse,
    getTrainerCourses, 
    updateCourse,
    enrollCourse, 
    getEnrolledCourses,
    getPendingCourses,
    updateCourseApproval
};


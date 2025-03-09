const Course = require("../models/Course");
const User = require("../models/User");

// ✅ Create Course
const createCourse = async (req, res) => {
    try {
        const { title, description, category, price, duration, prerequisites, certificationAvailable } = req.body;

        // ✅ Check if user is a trainer
        const trainer = await User.findById(req.user.id);
        if (!trainer || trainer.role !== "trainer") {
            return res.status(403).json({ success: false, message: "Only trainers can create courses" });
        }

        // ✅ Get uploaded images (from Multer)
        const thumbnail = req.files["thumbnail"] ? req.files["thumbnail"][0].path : null;
        const bannerImage = req.files["bannerImage"] ? req.files["bannerImage"][0].path : null;

        // ✅ Create New Course
        const course = new Course({
            title,
            description,
            category,
            trainer: trainer._id,
            thumbnail,
            bannerImage,
            price,
            duration,
            prerequisites,
            certificationAvailable
        });

        await course.save();

        return res.status(201).json({
            success: true,
            message: "Course created successfully",
            course
        });

    } catch (error) {
        console.error("Error creating course:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get Single Course by ID
const getCourse = async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ Debug: Log the received ID
        console.log("Received Course ID:", id);

        // ✅ Validate ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid course ID" });
        }

        // ✅ Fetch Course
        const course = await Course.findById(id).populate("trainer", "name email");

        // ✅ Debug: Log fetched course
        console.log("Fetched Course:", course);

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        return res.status(200).json({ success: true, course });

    } catch (error) {
        console.error("Error fetching course:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// ✅ Get All Courses
const getAllCourses = async (req, res) => {
    try {
        // ✅ Fetch all courses and populate trainer details
        const courses = await Course.find().populate("trainer", "name email");

        return res.status(200).json({ success: true, courses });

    } catch (error) {
        console.error("Error fetching courses:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { createCourse, getCourse, getAllCourses };

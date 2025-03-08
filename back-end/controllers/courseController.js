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

        // ✅ Send Response Immediately (THIS WAS MISSING)
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

module.exports = { createCourse };

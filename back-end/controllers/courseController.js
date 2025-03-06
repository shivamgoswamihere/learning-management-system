const Course = require("../models/Course");

// Create Course
exports.createCourse = async (req, res) => {
    try {
        const { title, description, category, thumbnail, bannerImage, price, duration, prerequisites, certificationAvailable } = req.body;
        const course = new Course({
            title,
            description,
            category,
            thumbnail,
            bannerImage,
            price,
            duration,
            prerequisites,
            certificationAvailable,
            status: "pending",
        });

        await course.save();
        res.status(201).json({ success: true, course });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all Courses
exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find({ status: "approved" }).populate("lessons");
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Approve Course (Admin Only)
exports.approveCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, { status: "approved" }, { new: true });
        res.status(200).json({ success: true, message: "Course approved", course });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

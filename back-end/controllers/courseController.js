const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const User = require("../models/User");

// ✅ Create Course with Lessons
const createCourse = async (req, res) => {
    try {
        const { title, description, category, price, duration, prerequisites, certificationAvailable } = req.body;
        const lessons = JSON.parse(req.body.lessons);

        // ✅ Check if user is a trainer
        const trainer = await User.findById(req.user.id);
        if (!trainer || trainer.role !== "trainer") {
            return res.status(403).json({ success: false, message: "Only trainers can create courses" });
        }

        // ✅ Upload Files (Multer)
        const thumbnail = req.files["thumbnail"] ? req.files["thumbnail"][0].path : null;
        const bannerImage = req.files["bannerImage"] ? req.files["bannerImage"][0].path : null;

        // ✅ Validate Files
        if (!thumbnail || !bannerImage) {
            return res.status(400).json({ success: false, message: "Thumbnail and Banner are required" });
        }

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

        // ✅ Handle Lessons
        const lessonPromises = lessons.map(async (lesson, index) => {
            const videoPath = req.files["lessonVideos"][index].path;
            const newLesson = new Lesson({
                title: lesson.title,
                description: lesson.description,
                videoUrl: videoPath,
                course: course._id,
                order: lesson.order
            });

            await newLesson.save();
        });

        await Promise.all(lessonPromises);

        return res.status(201).json({
            success: true,
            message: "Course and lessons created successfully",
            course
        });

    } catch (error) {
        console.error("Error creating course:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get All Courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find()
            .populate("trainer", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "All courses fetched successfully",
            courses
        });

    } catch (error) {
        console.error("Error fetching courses:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get Single Course by ID
const getCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id)
            .populate("trainer", "name email")
            .populate({
                path: "lessons",
                options: { sort: { order: 1 } }
            });

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Course fetched successfully",
            course
        });

    } catch (error) {
        console.error("Error fetching course:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createCourse,
    getAllCourses,
    getCourse
};


const Lesson = require("../models/Lesson");
const Course = require("../models/Course");

// ✅ Create a Lesson for a Course
const createLesson = async (req, res) => {
    try {
        const { courseId, title, description, order, unlocked, subtitles } = req.body;
        const videoUrl = req.file ? req.file.path : null; // Video uploaded using multer

        // Check if course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        // Create lesson
        const lesson = new Lesson({
            course: courseId,
            title,
            description,
            videoUrl,
            order,
            unlocked: unlocked || false,
            subtitles: subtitles || ""
        });

        await lesson.save();

        // Add lesson to course
        course.lessons.push(lesson._id);
        await course.save();

        res.status(201).json({ success: true, message: "Lesson created successfully", lesson });

    } catch (error) {
        console.error("Error creating lesson:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Update Lesson
const updateLesson = async (req, res) => {
    try {
        const { title, description, order, unlocked, subtitles } = req.body;
        const lessonId = req.params.lessonId;

        const lesson = await Lesson.findById(lessonId);
        if (!lesson) {
            return res.status(404).json({ success: false, message: "Lesson not found" });
        }

        // Update lesson fields
        lesson.title = title || lesson.title;
        lesson.description = description || lesson.description;
        lesson.order = order || lesson.order;
        lesson.unlocked = unlocked !== undefined ? unlocked : lesson.unlocked;
        lesson.subtitles = subtitles || lesson.subtitles;

        await lesson.save();

        res.status(200).json({ success: true, message: "Lesson updated successfully", lesson });

    } catch (error) {
        console.error("Error updating lesson:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Delete Lesson
const deleteLesson = async (req, res) => {
    try {
        const lessonId = req.params.lessonId;

        // Find lesson
        const lesson = await Lesson.findById(lessonId);
        if (!lesson) {
            return res.status(404).json({ success: false, message: "Lesson not found" });
        }

        // Remove lesson from course
        await Course.findByIdAndUpdate(lesson.course, {
            $pull: { lessons: lessonId }
        });

        // Delete lesson
        await Lesson.findByIdAndDelete(lessonId);

        res.status(200).json({ success: true, message: "Lesson deleted successfully" });

    } catch (error) {
        console.error("Error deleting lesson:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { createLesson, updateLesson, deleteLesson };

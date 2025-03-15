const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const User = require("../models/User");

const createCourse = async (req, res) => {
    try {
        const { 
            title, description, category, 
            price, duration, prerequisites, certificationAvailable 
        } = req.body;
        
        const lessons = Array.isArray(req.body.lessons) 
            ? req.body.lessons 
            : JSON.parse(req.body.lessons || "[]");

        // ✅ Check if user is a trainer
        const trainer = await User.findById(req.user.id);
        if (!trainer || trainer.role !== "trainer") {
            return res.status(403).json({ success: false, message: "Only trainers can create courses" });
        }

        // ✅ Upload Files (Multer)
        const thumbnail = req.files?.thumbnail?.[0]?.path || null;
        const bannerImage = req.files?.bannerImage?.[0]?.path || null;

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

        // ✅ Handle Lessons (Only if videos exist)
        if (Array.isArray(lessons) && lessons.length > 0) {
            const lessonPromises = lessons.map(async (lesson, index) => {
                const videoPath = req.files["lessonVideos"]?.[index]?.path || null;

                const newLesson = new Lesson({
                    title: lesson.title,
                    description: lesson.description,
                    videoUrl: videoPath,
                    course: course._id,
                    order: lesson.order
                });

                await newLesson.save();
                course.lessons.push(newLesson._id);
            });

            await Promise.all(lessonPromises);
            await course.save();
        }

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
// const getCourse = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const course = await Course.findById(id)
//             .populate("trainer", "name email")
//             .populate({
//                 path: "lessons",
//                 options: { sort: { order: 1 } }
//             });

//         if (!course) {
//             return res.status(404).json({ success: false, message: "Course not found" });
//         }

//         return res.status(200).json({
//             success: true,
//             message: "Course fetched successfully",
//             course
//         });

//     } catch (error) {
//         console.error("Error fetching course:", error);
//         return res.status(500).json({ success: false, message: error.message });
//     }
// };
const getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate("lessons") // ✅ This will bring all lessons linked to the course
            .populate("trainer", "name email"); // ✅ This will bring trainer info

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        res.status(200).json({
            success: true,
            course
        });
    } catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


const getTrainerCourses = async (req, res) => {
    try {
        const trainerId = req.user.id; // Extract trainer ID from authenticated user

        const trainer = await User.findById(trainerId);
        if (!trainer || trainer.role !== "trainer") {
            return res.status(403).json({ success: false, message: "Only trainers can access their courses" });
        }

        const courses = await Course.find({ trainer: trainerId }).populate("lessons");

        return res.status(200).json({
            success: true,
            courses,
        });

    } catch (error) {
        console.error("Error fetching trainer courses:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createCourse,
    getAllCourses,
    getCourse,
    getTrainerCourses, // ✅ Add this function to exports
};


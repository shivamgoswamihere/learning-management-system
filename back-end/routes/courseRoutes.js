// const express = require("express");
// const { createCourse, getCourse, getAllCourses } = require("../controllers/courseController");
// const protect = require("../middlewares/authMiddleware");
// const upload = require("../middlewares/multerConfig");

// const router = express.Router();

// // ✅ Create Course (Trainer Only)
// router.post(
//     "/create-course",
//     protect(["trainer"]),
//     upload.fields([
//         { name: "thumbnail", maxCount: 1 },
//         { name: "bannerImage", maxCount: 1 }
//     ]),
//     createCourse
// );

// // ✅ Get All Courses (Public)
// router.get("/all-courses", getAllCourses);

// // ✅ Get Single Course by ID (Logged-in Users Only)
// router.get("/:id", protect(), getCourse);

// module.exports = router;

// const express = require("express");
// const { createCourse } = require("../controllers/courseController");
// const protect = require("../middlewares/authMiddleware");
// const upload = require("../middlewares/multerConfig");

// const router = express.Router();

// // ✅ Create Course (Trainer Only)
// router.post(
//     "/create-course",
//     protect(["trainer"]),
//     upload.fields([
//         { name: "thumbnail", maxCount: 1 },
//         { name: "bannerImage", maxCount: 1 },
//         { name: "lessonVideos", maxCount: 50 }  // ✅ Added this line
//     ]),
//     createCourse
// );

// module.exports = router;

const express = require("express");
const { uploadCourseFiles } = require("../middlewares/multerConfig");
const { createCourse, getCourse, getAllCourses } = require("../controllers/courseController");
const protect = require("../middlewares/authMiddleware");

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

// ✅ Get Single Course by ID (Logged-in Users Only)
router.get("/:id", protect(), getCourse);

module.exports = router;

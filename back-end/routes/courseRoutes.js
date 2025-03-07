// const express = require("express");
// const { createCourse, getCourses, approveCourse } = require("../controllers/courseController");
// const { uploadCourseImage } = require("../middlewares/multer");
// const router = express.Router();

// router.post("/upload-course", uploadCourseImage.fields([{ name: "thumbnail" }, { name: "bannerImage" }]), (req, res) => {
//     res.json({
//         thumbnail: req.files["thumbnail"] ? req.files["thumbnail"][0].path : "",
//         bannerImage: req.files["bannerImage"] ? req.files["bannerImage"][0].path : "",
//     });
//     router.get("/", getCourses); // Get all courses
// router.put("/approve/:id", verifyAdmin, approveCourse); // Admin approves course
// });

// module.exports = router;

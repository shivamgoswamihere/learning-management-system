const express = require("express");
const { createLesson, deleteLesson, updateLesson } = require("../controllers/lessonController");
const protect = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multerConfig");

const router = express.Router();

// ✅ Create Lesson for a Course (Trainer Only)
router.post(
    "/create-lesson",
    protect(["trainer"]),
    upload.single("video"), // Upload video using multer
    createLesson
);

// ✅ Update Lesson (Trainer Only)
router.put("/:lessonId", protect(["trainer"]), updateLesson);

// ✅ Delete Lesson (Trainer Only)
router.delete("/:lessonId", protect(["trainer"]), deleteLesson);

module.exports = router;

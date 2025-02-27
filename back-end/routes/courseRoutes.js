const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const roleAuth = require("../middlewares/roleAuth");

// Only trainers & admins can create courses
router.post("/create", authMiddleware, roleAuth(["trainer", "admin"]), (req, res) => {
  res.json({ message: "Course created successfully" });
});

// Only registered users & examinees can enroll in courses
router.post("/enroll", authMiddleware, roleAuth(["registered_user", "examinee"]), (req, res) => {
  res.json({ message: "Enrolled successfully" });
});

// Only admin can delete a course
router.delete("/:id", authMiddleware, roleAuth(["admin"]), (req, res) => {
  res.json({ message: "Course deleted" });
});

module.exports = router;

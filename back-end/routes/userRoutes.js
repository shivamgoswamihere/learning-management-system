const express = require("express");
const { getUsers, getUserById, updateUser, partialUpdateUser, deleteUser } = require("../controllers/userController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();
router.get("/", protect(["admin"]), getUsers);       // Admin only
router.get("/:id", protect(["admin", "learner", "trainer", "examinee"]), getUserById);  // Admin & user themselves
router.put("/:id", protect(["admin", "learner", "trainer", "examinee"]), updateUser);   // Admin & user themselves
router.patch("/:id", protect(["admin", "learner", "trainer", "examinee"]), partialUpdateUser); // Partial update
router.delete("/:id", protect(["admin", "learner", "trainer", "examinee"]), deleteUser); // Admin & user themselves

module.exports = router;

const express = require("express");
const { getUsers, getUserById, getCurrentUser, updateUser, partialUpdateUser, deleteUser } = require("../controllers/userController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", protect(["admin"]), getUsers);
router.get("/me", protect(["admin", "learner", "trainer", "examinee"]), getCurrentUser);  // ✅ New route to get current user
router.get("/:id", protect(["admin"]), getUserById);  
router.put("/:id", protect(["admin", "learner", "trainer", "examinee"]), updateUser);   
router.patch("/:id", protect(["admin", "learner", "trainer", "examinee"]), partialUpdateUser);
router.delete("/:id", protect(["admin", "learner", "trainer", "examinee"]), deleteUser); 

module.exports = router;

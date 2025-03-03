const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { uploadProfilePic } = require("../middlewares/multerConfig.js");
const router = express.Router();
router.post("/register", uploadProfilePic.single("profilePicture"), registerUser);
router.post("/login", loginUser);
module.exports = router; 
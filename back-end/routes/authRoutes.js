const express = require("express");
const upload = require("../middlewares/multerConfig"); // Import the multer configuration
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

router.post("/register", upload.single("profilePicture"), registerUser);
router.post("/login", loginUser);

module.exports = router;


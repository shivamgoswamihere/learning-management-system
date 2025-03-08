const express = require("express");
const { createCourse } = require("../controllers/courseController");
const protect = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multerConfig");

const router = express.Router();

router.post(
    "/create-course",
    protect(["trainer"]),
    upload.fields([
        { name: "thumbnail", maxCount: 1 },
        { name: "bannerImage", maxCount: 1 }
    ]),
    createCourse
);

module.exports = router;

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// ✅ Dynamic Folder Based on Route
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        let folder = "general_uploads";

        if (file.mimetype.startsWith("image/")) {
            if (req.baseUrl.includes("/courses")) {
                folder = "course_images";
            } else if (req.baseUrl.includes("/users")) {
                folder = "user_profiles";
            }
            return {
                folder,
                format: "png",
                public_id: `${Date.now()}-${file.originalname}`,
            };
        } 
        else if (file.mimetype.startsWith("video/")) {
            folder = "lesson_videos";
            return {
                folder,
                format: "mp4",
                resource_type: "video",
                public_id: `${Date.now()}-${file.originalname}`,
            };
        }

        throw new Error("Invalid file type");
    }
});

const upload = multer({ storage });
module.exports = upload;



// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: "user_profiles", // Folder name in Cloudinary
//         format: async (req, file) => "png", // Convert to PNG
//         public_id: (req, file) => `${Date.now()}-${file.originalname}`,
//     },
// });

// const upload = multer({ storage: storage });

// module.exports = upload;

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Function to dynamically choose the folder based on file type
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        let folder = "general_uploads"; // Default folder

        if (file.mimetype.startsWith("image/")) {
            // If the request is for course images
            if (req.baseUrl.includes("/courses")) {
                folder = "course_images";
            } 
            // If the request is for user profile images
            else if (req.baseUrl.includes("/users")) {
                folder = "user_profiles";
            }
            return {
                folder,
                format: "png", // Convert all images to PNG
                public_id: `${Date.now()}-${file.originalname}`,
            };
        } else if (file.mimetype.startsWith("video/")) {
            folder = "lesson_videos"; // Store lesson videos in "lesson_videos"
            return {
                folder,
                format: "mp4", // Store videos in MP4 format
                resource_type: "video", // Explicitly set resource type
                public_id: `${Date.now()}-${file.originalname}`,
            };
        }

        throw new Error("Invalid file type"); // Reject if not image or video
    },
});

const upload = multer({ storage });

module.exports = upload;

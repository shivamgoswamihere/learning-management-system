const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const { v4: uuidv4 } = require("uuid");

// ✅ Dynamic Storage Based on File Type
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = "general_uploads";
    let resourceType = "image";

    if (file.mimetype.startsWith("image/")) {
      if (req.baseUrl.includes("/courses")) folder = "course_images";
      if (req.baseUrl.includes("/users")) folder = "user_profiles";
      return {
        folder,
        format: file.mimetype.split("/")[1], 
        public_id: `${uuidv4()}-${file.originalname}`,
        resource_type: "image"
      };
    }

    if (file.mimetype.startsWith("video/")) {
      folder = "lesson_videos";
      resourceType = "video";
      return {
        folder,
        format: "mp4",
        public_id: `${uuidv4()}-${file.originalname}`,
        resource_type: "video"
      };
    }

    throw new Error("Invalid file type");
  },
});

// ✅ Handle Single and Multiple Files Dynamically
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50 MB max file size
});

module.exports = {
  uploadSingle: upload.single("profilePicture"),
  uploadCourseFiles: upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "bannerImage", maxCount: 1 },
    { name: "lessonVideos", maxCount: 50 }
  ])
};

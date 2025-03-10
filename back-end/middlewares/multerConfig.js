// // const multer = require("multer");
// // const { CloudinaryStorage } = require("multer-storage-cloudinary");
// // const cloudinary = require("../config/cloudinary");

// // // ✅ Dynamic Folder Based on Route
// // const storage = new CloudinaryStorage({
// //     cloudinary: cloudinary,
// //     params: async (req, file) => {
// //         let folder = "general_uploads";

// //         if (file.mimetype.startsWith("image/")) {
// //             if (req.baseUrl.includes("/courses")) {
// //                 folder = "course_images";
// //             } else if (req.baseUrl.includes("/users")) {
// //                 folder = "user_profiles";
// //             }
// //             return {
// //                 folder,
// //                 format: "png",
// //                 public_id: `${Date.now()}-${file.originalname}`,
// //             };
// //         } 
// //         else if (file.mimetype.startsWith("video/")) {
// //             folder = "lesson_videos";
// //             return {
// //                 folder,
// //                 format: "mp4",
// //                 resource_type: "video",
// //                 public_id: `${Date.now()}-${file.originalname}`,
// //             };
// //         }

// //         throw new Error("Invalid file type");
// //     }
// // });

// // const upload = multer({ storage });
// // module.exports = upload;


// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");
// const { v4: uuidv4 } = require("uuid");

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: async (req, file) => {
//         let folder = "general_uploads";

//         // ✅ Handle Image Upload
//         if (file.mimetype.startsWith("image/")) {
//             if (req.baseUrl.includes("/courses")) {
//                 folder = "course_images";
//             } else if (req.baseUrl.includes("/users")) {
//                 folder = "user_profiles";
//             }

//             return {
//                 folder,
//                 resource_type: "image",
//                 public_id: `${uuidv4()}-${file.originalname.replace(/\s/g, '-')}`,
//             };
//         }

//         // ✅ Handle Video Upload
//         else if (file.mimetype.startsWith("video/")) {
//             folder = "lesson_videos";
//             return {
//                 folder,
//                 resource_type: "video",
//                 public_id: `${uuidv4()}-${file.originalname.replace(/\s/g, '-')}`,
//                 eager: [
//                     { width: 720, height: 480, crop: "limit" },
//                     { width: 1920, height: 1080, crop: "limit" }
//                 ],
//             };
//         }

//         // ❌ Invalid File Type
//         else {
//             throw new Error("Invalid file type");
//         }
//     }
// });

// const upload = multer({ storage });
// module.exports = upload;

// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");
// const { v4: uuidv4 } = require("uuid");

// // ✅ Dynamic Storage Based on File Type
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: async (req, file) => {
//     let folder = "general_uploads";
//     let resourceType = "image";

//     if (file.mimetype.startsWith("image/")) {
//       if (req.baseUrl.includes("/courses")) folder = "course_images";
//       if (req.baseUrl.includes("/users")) folder = "user_profiles";
//       return {
//         folder,
//         format: file.mimetype.split("/")[1], 
//         public_id: `${uuidv4()}-${file.originalname}`,
//         resource_type: "image"
//       };
//     }

//     if (file.mimetype.startsWith("video/")) {
//       folder = "lesson_videos";
//       resourceType = "video";
//       return {
//         folder,
//         format: "mp4",
//         public_id: `${uuidv4()}-${file.originalname}`,
//         resource_type: "video"
//       };
//     }

//     throw new Error("Invalid file type");
//   },
// });

// // ✅ Handle Multiple Files
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 50 * 1024 * 1024 } // 50 MB max file size
// }).fields([
//   { name: "thumbnail", maxCount: 1 },
//   { name: "bannerImage", maxCount: 1 },
//   { name: "lessonVideos", maxCount: 50 }
// ]);

// module.exports = upload;

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

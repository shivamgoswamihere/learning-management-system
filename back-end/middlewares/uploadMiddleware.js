// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary.js";

// // Function to create different storage configurations
// const getStorage = (folderName) => {
//   return new CloudinaryStorage({
//     cloudinary: cloudinary.v2,
//     params: {
//       folder: folderName, // Dynamically set folder
//       allowed_formats: ["jpg", "png", "jpeg", "mp4", "avi", "mkv"], // Include videos
//       transformation: folderName === "profile_pics" 
//         ? [{ width: 500, height: 500, crop: "limit" }] // Resize only for profile pictures
//         : undefined, // No transformation for videos
//       resource_type: folderName === "training_videos" ? "video" : "image", // Set type
//     },
//   });
// };

// // Different upload configurations
// const uploadProfilePic = multer({ storage: getStorage("profile_pics") });
// const uploadTrainingVideo = multer({ storage: getStorage("training_videos") });

// export { uploadProfilePic, uploadTrainingVideo };

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Function to create different storage configurations
const getStorage = (folderName) => {
  return new CloudinaryStorage({
    cloudinary: cloudinary,  // No need for cloudinary.v2, already imported properly
    params: {
      folder: folderName, 
      allowed_formats: ["jpg", "png", "jpeg"], // Only images for profile pics
      transformation: folderName === "profile_pics"
        ? [{ width: 500, height: 500, crop: "limit" }] // Resize for profile pics
        : undefined, 
      resource_type: "image", // Ensure it's an image
    },
  });
};

// Upload middleware for profile pictures
const uploadProfilePic = multer({ storage: getStorage("profile_pics") });

export { uploadProfilePic };

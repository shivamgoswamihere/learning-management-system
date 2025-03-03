const multer = require("multer");
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const  cloudinary = require("../config/cloudinary.js");

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

module.exports= { uploadProfilePic };

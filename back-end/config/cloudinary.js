// // import cloudinary from "cloudinary";
// // import dotenv from "dotenv";

// // dotenv.config();

// // cloudinary.v2.config({
// //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// //   api_key: process.env.CLOUDINARY_API_KEY,
// //   api_secret: process.env.CLOUDINARY_API_SECRET,
// // });

// // export default cloudinary;

// require("dotenv").config();
// const express = require("express");
// const cloudinary = require("cloudinary").v2;
// const cors = require("cors");
// const Multer = require("multer");
// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// async function handleUpload(file) {
//   const res = await cloudinary.uploader.upload(file, {
//     resource_type: "auto",
//   });
//   return res;
// module.exports =  cloudinary;

const cloudinary = require("cloudinary").v2;
require("dotenv").config(); // Ensure you have environment variables

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;

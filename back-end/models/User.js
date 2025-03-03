// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['learner', 'trainer', 'admin', 'examinee'], required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('User', userSchema);

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["learner", "trainer", "examiner", "admin"], required: true },
    profilePicture: { type: String }, // Cloudinary URL

    // Common fields
    phoneNumber: { type: String },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    dateOfBirth: { type: Date },
    address: {
        local: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        pincode: { type: String },
    },

    // Learner-Specific Fields
    qualification: { type: String }, // Graduate, Post Graduate, etc.
    degree: { type: String }, // Engineering, Arts, etc.
    qualificationStatus: { type: String, enum: ["Pursuing", "Completed"] },
    profession: { type: String }, // Student, Working Professional, etc.
    organization: { name: String, address: String },
    interests: { type: String },

    // Examiner-Specific Fields
    canEnrollCourses: { type: Boolean, default: false }, // Cannot enroll unless upgraded

    // Trainer-Specific Fields
    professionalTitle: { type: String }, // Industry Expert, Professor, etc.
    totalExperience: { type: Number },
    socialLinks: {
        linkedIn: { type: String },
        github: { type: String },
        youtube: { type: String },
        twitter: { type: String },
    },
    careerDescription: { type: String },

    // Admin-Specific Fields
    accessLevel: { type: String, enum: ["Full Admin", "Content Manager", "Finance Manager"] },

    // Privacy Settings
    privacySettings: {
        showEmail: { type: Boolean, default: true },
        showPhone: { type: Boolean, default: true },
        showProfession: { type: Boolean, default: true },
    },

    // Soft Delete (for deactivation)
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
});

module.exports = mongoose.model("User", UserSchema);

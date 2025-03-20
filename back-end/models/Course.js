const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String }, // Cloudinary URL
    // bannerImage: { type: String }, // Cloudinary URL
    price: { type: Number, default: 0 }, // 0 for free courses
    duration: { type: Number }, // Total hours
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }], // Lessons
    lastUpdated: { type: Date, default: Date.now },
    prerequisites: [String], // List of prerequisites
    courseLevel: {type: String, enum:["Beginner", "Intermediate", "Advance"], default:"Beginner"},
    certificationAvailable: { type: Boolean, default: false },
    reviews: [{ userId: mongoose.Schema.Types.ObjectId, comment: String, rating: Number }],
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }, // Approval workflow
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Trainer reference
    syllabus: [{ 
        title: { type: String, required: true },
        description: { type: String, required: true }
    }]
    
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);

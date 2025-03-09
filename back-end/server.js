const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const connectDB = require("./config/db"); 


dotenv.config(); 

const app = express();

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,              
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/courses",courseRoutes);
app.use("/api/lessons",lessonRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

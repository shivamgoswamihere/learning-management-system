const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db"); 


dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json()); // ✅ Correctly using express.json()
app.use(express.urlencoded({ extended: true })); // ✅ Helps parse form data


app.use(cors({
    origin: "http://localhost:5173", // ✅ Allow only your frontend origin
    credentials: true,               // ✅ Allow credentials (cookies, tokens)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Connect to MongoDB (Only once)
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

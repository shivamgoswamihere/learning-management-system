const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const protect = (roles = []) => {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({ message: "Access denied. No token provided." });
            }

            const token = authHeader.split(" ")[1];

            // 🔹 Verify JWT Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            // 🔹 Fetch user from DB to ensure they exist
            const user = await User.findById(decoded.id).select("-password");
            if (!user) {
                return res.status(401).json({ message: "User no longer exists. Please log in again." });
            }

            // 🔹 Check if user is authorized based on role
            if (roles.length && !roles.includes(user.role)) {
                return res.status(403).json({ message: "Forbidden: You do not have access." });
            }

            next(); // Proceed to next middleware or route handler
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Session expired. Please log in again." });
            } else if (error.name === "JsonWebTokenError") {
                return res.status(401).json({ message: "Invalid token." });
            }
            res.status(500).json({ message: "Server error", error: error.message });
        }
    };
};

module.exports = protect;

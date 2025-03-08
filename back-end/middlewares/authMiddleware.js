const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const protect = (roles = []) => {
    return async (req, res, next) => {
        try {
            console.log("⏳ Checking Authorization Header...");
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                console.log("❌ No token found in request");
                return res.status(401).json({ message: "Access denied. No token provided." });
            }

            const token = authHeader.split(" ")[1];
            console.log("✅ Token received:", token);

            // 🔹 Verify JWT Token
            console.log("🔍 Verifying token...");
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("✅ Token decoded:", decoded);

            // Ensure token contains a valid ID
            if (!decoded.id) {
                console.log("❌ Token missing user ID");
                return res.status(401).json({ message: "Invalid token structure." });
            }

            req.user = decoded;

            // 🔹 Fetch user from DB to ensure they exist
            console.log("🔍 Checking if user exists in DB...");
            const user = await User.findById(decoded.id).select("-password");
            if (!user) {
                console.log("❌ User not found in DB!");
                return res.status(401).json({ message: "User no longer exists. Please log in again." });
            }

            console.log("✅ User exists:", user.email);

            // 🔹 Check if user is authorized based on role
            if (roles.length && !roles.includes(user.role)) {
                console.log("❌ User role not authorized");
                return res.status(403).json({ message: "Forbidden: You do not have access." });
            }

            console.log("✅ Access granted, proceeding...");
            next(); // Proceed to next middleware or route handler
        } catch (error) {
            console.error("🔥 Error in protect middleware:", error);

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

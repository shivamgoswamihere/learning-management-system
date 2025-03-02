const User = require("../models/User");

// ✅ Get all users (Admin only)
const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Exclude password
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ✅ Get user by ID (Admin & User themselves)
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.user.role !== "admin" && req.user.id !== id) {
            return res.status(403).json({ message: "Access denied" });
        }

        const user = await User.findById(id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ✅ Update user profile (User themselves)
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (req.user.id !== id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }

        const updates = req.body;
        const user = await User.findByIdAndUpdate(id, updates, { new: true }).select("-password");

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ✅ Partially update user (PATCH request)
const partialUpdateUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (req.user.id !== id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }

        const updates = req.body;
        const user = await User.findByIdAndUpdate(id, { $set: updates }, { new: true }).select("-password");

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// ✅ Delete user (Admin & User themselves)
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (req.user.id !== id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }

        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = { getUsers, getUserById, updateUser, partialUpdateUser, deleteUser };

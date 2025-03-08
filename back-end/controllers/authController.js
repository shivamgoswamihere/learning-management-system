const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// ✅ Register User

const registerUser = async (req, res) => {
    try {
        console.log("Incoming Request:", req.body);

        const {
            fullName, username, email, password, role, phoneNumber, gender, dateOfBirth,
            qualification, degree, qualificationStatus, profession, organization, interests,
            professionalTitle, totalExperience, socialLinks, careerDescription, accessLevel, address
        } = req.body;

        // Required Fields Validation
        if (!fullName || !username || !email || !password || !role) {
            return res.status(400).json({ error: "All required fields must be provided." });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Upload Profile Picture to Cloudinary
        let profilePicture = req.body.profilePicture || ""; // Get from body

        if (req.file) {
        
            const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
                folder: "user_profiles",
                transformation: [{ width: 500, height: 500, crop: "limit" }],
            });
            profilePicture = uploadedImage.secure_url;
        }


        const userData = {
            fullName,
            username,
            email,
            password: hashedPassword,
            role,
            profilePicture: profilePicture || "",
            phoneNumber,
            gender: gender || "Other", // Default value
            dateOfBirth,
            address,
            isDeleted: false,
            deletedAt: null
        };
        console.log("Final User Data:", userData);

        // Role-specific fields
        if (role === "learner") {
            Object.assign(userData, {
                qualification,
                degree,
                qualificationStatus: qualificationStatus || "Pursuing",
                profession,
                organization: organization ? { name: organization, address: "" } : null,
                interests
            });
        }

        if (role === "trainer") {
            Object.assign(userData, {
                professionalTitle,
                totalExperience,
                socialLinks,
                careerDescription
            });
        }

        if (role === "examiner") {
            Object.assign(userData, { canEnrollCourses: false });
        }

        if (userData.role === "admin") {
            if (!userData.accessLevel) {
                userData.accessLevel = "Full Admin"; // Set a valid default
            } else if (!["Full Admin", "Content Manager", "Finance Manager"].includes(userData.accessLevel)) {
                return res.status(400).json({ error: "Invalid access level provided." });
            }
        }
        
        console.log("Before saving, profilePicture:", profilePicture);

        // Create and Save User
        const user = new User(userData);
        await user.save();

        const savedUser = await User.findOne({ username });
        console.log("Saved User in DB:", savedUser);
        
        res.status(201).json({ message: "User registered successfully", user });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ error: error.message || "Server Error" });
    }
};


// ✅ Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate token with user role
        const token = generateToken({ id: user._id, role: user.role });

        // ✅ Save token to user document
        user.tokens.push({ token });
        await user.save();
        res.json({ 
            message: "Login successful", 
            token, 
            user: { id: user._id, name: user.name, email: user.email, role: user.role } 
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = { registerUser, loginUser };

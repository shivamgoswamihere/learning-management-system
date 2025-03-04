const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,  // Ensure this is set in .env
    { expiresIn: "3d" }      // Token expiry time
  );
};

module.exports = generateToken;

const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const { name, email, passwordHash, role } = req.body;
    
    const newUser = new User({ name, email, passwordHash, role });
    await newUser.save();

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

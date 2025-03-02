const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

exports.register = async (req,res) => {
  try{
    const {name, email, password, role} = req.body;
     
    const exsistingUser = await User.findOne({email});
    if(exsistingUser){
      return res.status(401).json({message: "this email is already exsist"})
    }
    const hashPassword = await bcrypt.hash(password,10)

    const newUser = new User ({
      name,
      email,
      password:hashPassword,
      role:role
    })
    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  }
  catch(error){
    return res.status(500).json({message: "server error"})
  }
}

exports.login = async (req,res) =>{
  const {email, password} = req.body;
  try {
    const user = await User.findOne({email});
    if (!user) return res.status(404).json({message: "user not found"})

  
  const isMatch = await bcrypt.compare(password,user.password);
  if(!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({id:user._id,role:user.role},JWT_SECRET,{expiresIn:"1hr"});
  res.status(200).json({
    token,
    role: user.role,  
  });
}
  catch (error) {
  res.status(500).json({ message: error.message });
}
}
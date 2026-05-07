const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
1
    if (!token || !newPassword) {
      return res.status(400).json({
        message: "Token and password required",
      });
    }

    
    let decoded;
    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "secretkey"
      );
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(400).json({ message: "Token expired ⏱" });
      }
      return res.status(400).json({ message: "Invalid token " });
    }

    
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.json({
      message: "Password updated successfully ",
    });

  } catch (err) {
    console.log("RESET ERROR:", err.message);
    res.status(500).json({
      message: "Server error ",
    });
  }
};


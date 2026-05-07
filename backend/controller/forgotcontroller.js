const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const sendmail = require("../utils/sendMail");


exports.forgotPassword = async (req, res) => {
    
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" } 
    );
    await sendmail(email, token);
        res.json({ message: "Reset link sent to email" });

  } catch (err) {
    console.log("EMAIL ERROR:", err);
    res.status(500).json({ message: "Email send error " });
  }
};

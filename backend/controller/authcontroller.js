const express = require("express");
const OTP =require( "../models/Otp.js");
const { generateOTP } = require("../utils/generateOtp.js");
const { sendOTP } =require ("../utils/sendMail.js");
const jwt =require ("jsonwebtoken");

exports.sendOTP = async (req, res) => {
    

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const otp = generateOTP();
    console.log("OTP:", otp);

    await OTP.deleteMany({ email });

    await OTP.create({
      email,
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    console.log("Saved in DB");

    try {
      await sendOTP(email, otp);
      console.log("Email sent");
    } catch (err) {
      console.log(" Email failed:", err.message);
      console.log(" OTP (for testing):", otp);
    }

    res.json({ message: "OTP generated successfully" });

  } catch (error) {
    console.log("🔥 ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP required" });
    }

    const record = await OTP.findOne({ email, otp });

    if (!record) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (record.expiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    await OTP.deleteMany({ email });

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ message: "Login success", token });

  } catch (error) {
    console.log("VERIFY OTP ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

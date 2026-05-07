const express = require("express");
const Userr = require("../models/User"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup=async(req,res)=>{
try {
    const { name, email, password } = req.body;

    const existingUser = await Userr.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = await Userr.create({
      name,
      email,
      password: hashedPassword,
    }); 

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      "secretkey",
      { expiresIn: "1y" }
    );

    res.json({
      message: "Signup successful",
      token,
      newUser,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Signup error" });
  }
};

exports.login=async(req,res)=>{
try{

    const {email,password}=req.body;

    const user=await User.findOne({email});

    if(!user){
      return res.status(400).json({message:"User not found"});
    }

    const isMatch=await bcrypt.compare(password,user.password);

    if(!isMatch){
      return res.status(400).json({message:"Invalid email or password"});
    }

    const token=jwt.sign({id:user._id,email:user.email},"secretkey",{expiresIn:"1d"});

    
    res.json({
      message:"Login successful",
      user,
      token
     
    });

  }catch(err){
    console.log(err);
    res.status(500).json({message:"Login error"});
  }
};

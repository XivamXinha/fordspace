const express = require("express");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const User = require("../models/User");

const router = express.Router();

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASS
  }
});


// ================= SIGNUP =================

router.post("/signup",async(req,res)=>{

  try{

    const {name,email,gender,password} = req.body;

    if(!name || !email || !gender || !password){
      return res.status(400).json({message:"All fields required"});
    }

    const existingUser = await User.findOne({email});

    if(existingUser){
      return res.status(400).json({message:"User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const otp = Math.floor(100000 + Math.random()*900000).toString();

    const user = new User({
      name,
      email,
      gender,
      password:hashedPassword,
      otp,
      verified:false
    });

    await user.save();

    try{

      await transporter.sendMail({
        from:process.env.EMAIL_USER,
        to:email,
        subject:"FordSpace Email Verification",
        text:`Your OTP is ${otp}`
      });

    }catch(err){
      console.log("Mail error:",err);
    }

    res.json({message:"Signup successful. OTP sent to your email"});

  }catch(err){

    console.log(err);

    res.status(500).json({message:"Signup failed"});

  }

});


// ================= VERIFY =================

router.post("/verify",async(req,res)=>{

  try{

    const {email,otp} = req.body;

    const user = await User.findOne({email});

    if(!user){
      return res.status(404).json({message:"User not found"});
    }

    if(user.otp !== otp){
      return res.status(400).json({message:"Invalid OTP"});
    }

    user.verified = true;
    user.otp = "";

    await user.save();

    res.json({message:"Email verified successfully"});

  }catch(err){

    res.status(500).json({message:"Verification failed"});

  }

});


// LOHINNNN 

router.post("/login",async(req,res)=>{

  try{

    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(!user){
      return res.status(404).json({message:"User not found"});
    }

    const match = await bcrypt.compare(password,user.password);

    if(!match){
      return res.status(400).json({message:"Wrong password"});
    }

    if(!user.verified){
      return res.status(400).json({message:"Email not verified"});
    }

    res.json({
      message:"Login successful",
      user
    });

  }catch(err){

    res.status(500).json({message:"Login failed"});

  }

});

module.exports = router;
const express=require("express")
const router=express.Router();
const User=require("../models/User.js")
const { body, validationResult } = require('express-validator');
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const fetchuser=require("../middleware/fetchuser.js")

const JWT_SECRET=process.env.JWT_TOKEN;

// create a user endpoint using POST
router.post ("/createuser",[
    body("name","Enter name without space, numbers or special characters").isAlpha(),
    body("email","Enter a valid Email").isEmail(),
    body("password","Password length should be greater than 5 and less than 10").isLength({min:6,max:10}),
], async (req,res)=>{

    try {
        
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let user=await User.findOne({email:req.body.email})
    if(user){
        return res.status(400).json({error:"Email Id already exists"});
    }

    const securedPassword=await bcrypt.hash(req.body.password,await bcrypt.genSalt(10));

    user= await User.create({
      name: req.body.name,
      email:req.body.email,
      password: securedPassword
    });

    const data={
        user:{
            id:user.id
        }
    }
    const authToken=jwt.sign(data,JWT_SECRET);
    console.log(authToken);
    res.json({authToken});

    // res.status(201).send("User Created")
    // .then(user => res.json(user))
    // .catch(error=>{ console.log(error),res.json({error:"Email id already exists",message:error.message}) });

    } catch (error) {
        console.log("getuser: "+error.message);
        res.status(500).send("Internal Server Error");
    }
})


// Login a user endpoint using POST
router.post ("/login",[
    body("email","Enter a valid Email").isEmail(),
    body("password","Password cannot be blank").exists()
], async (req,res)=>{

    try {
        
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password}=req.body;

    let user=await User.findOne({email})
    if(!user){
        return res.status(400).json({error:"User does not exist, try signing up first"});
    }

    const passwordCompare=await bcrypt.compare(password,user.password);
    if(!passwordCompare){
        return res.status(400).json({error:"Invalid credentials"});
    }

    const data={
        user:{
            id:user.id
        }
    }
    const authToken=jwt.sign(data,JWT_SECRET);
    res.json({authToken});

    // res.status(201).send("User Created")
    // .then(user => res.json(user))
    // .catch(error=>{ console.log(error),res.json({error:"Email id already exists",message:error.message}) });

    } catch (error) {
        console.log("login: "+error.message);
        res.status(500).send("Internal Server Error");
    }
})


// Get user datails endpoint using POST
router.post ("/getuser",fetchuser,async (req,res)=>{

    try {
    
    let user=await User.findById(req.user.id).select("-password");
    if(!user){
        return res.status(400).json({error:"User does not exist, try signing up first"});
    }

    res.json(user);

    } catch (error) {
        console.log("getuser: "+error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports=router;
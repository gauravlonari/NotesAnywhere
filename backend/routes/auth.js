const express=require("express")
const router=express.Router();
const User=require("../models/User.js")
const { body, validationResult } = require('express-validator');
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const fetchuser=require("../middleware/fetchuser.js")

const JWT_SECRET=require("../keys/jwtsecretkey").JWT_SECRET_KEY;

// create a user endpoint using POST
router.post ("/createuser",[
    body("name","Enter name without space, numbers or special characters").isAlpha(),
    body("email","Enter a valid Email").isEmail(),
    body("password","Password length should be greater than 8 and less than 32").isLength({min:8,max:32}),
], async (req,res)=>{

    try {
        
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(),error:"Error in parameters"  });
    }

    let user=await User.findOne({email:req.body.email})
    if(user){
        return res.status(400).json({error:"Email Id already exists, please try signing in"});
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
        console.log("createuser: "+error.message);
        res.status(500).json({error:"Internal Server Error"});
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
      return res.status(400).json({ errors: errors.array(),error:"Error in parameters"  });
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
        res.status(500).json({error:"Internal Server Error"});
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
        res.status(500).json({error:"Internal Server Error"});
    }
})


module.exports=router;
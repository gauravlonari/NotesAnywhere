const express=require("express")
const router=express.Router()
const fetchuser=require("../middleware/fetchuser")
const Note=require("../models/Note")
const { body, validationResult } = require('express-validator');

// Get all notes of user
router.get("/fetchallnotes",fetchuser,async (req,res)=>{
    try{
        let notes=await Note.find({user:req.user.id});
        res.json(notes);
    }
    catch(error){
        res.status(500).json({error:"Internal Server Error"});
        console.log("fetchallnotes: "+error.message)
    }
})

// Add a new note
router.post("/addnote",fetchuser,[
    body("title","Enter a valid title").exists(),
    // body("description","Description must not be less than 5 characters").isLength({min:5}),
],async (req,res)=>{
    try{
        const errors=validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(),error:"Error in parameters" });
        }
        const {title,description,tag}=req.body;
        
        const note={
            title,description,user:req.user.id,
        }
        if(tag && tag!==""){
            note.tag=tag;
        }
        Note.create(note).then(note=>{res.status(201).json(note)}).catch(error=>{res.status(500).json({error:error.message})});
    }
    catch(error){
        res.status(500).json({error:"Internal Server Error"});
        console.log("addnote: "+error.message)
    }
})

// Update Note
router.put("/updatenote/:id",fetchuser,async (req,res)=>{
    try{
        // const errors=validationResult(req);
        // if (!errors.isEmpty()) {
            //     return res.status(400).json({ errors: errors.array(),error:"Error in parameters"  });
            // }
            if(req.params.id==="null"){
                return res.status(400).json({error:"Bad Request"});
            }
            const {title,description,tag}=req.body;
            const newNote={};
            
            if(title){
                newNote.title=title;
            }
            if(description){
                newNote.description=description;
            }
            if(tag && tag!==""){
                newNote.tag=tag;
            }
            let note=await Note.findById(req.params.id);
            if(!note){
                return res.status(404).json({error:"Invalid Note"});
            }
            if(note.user.toString()!==req.user.id){
                return res.status(401).json({error:"Not Allowed"});
            }
            
            note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
            // console.log(note);
            res.json(note);
        }
        catch(error){
            res.status(500).json({error:"Internal Server Error"});
            console.log("updatenote: "+error.message)
        }
    })
    
    // Delete Note
    router.delete("/deletenote/:id",fetchuser,async (req,res)=>{
        try{
            // const errors=validationResult(req);
            // if (!errors.isEmpty()) {
                //     return res.status(400).json({ errors: errors.array(),error:"Error in parameters"  });
                // }
                
                if(req.params.id==="null"){
                    return res.status(400).json({error:"Bad Request"});
                }
                let note=await Note.findById(req.params.id);
                if(!note){
                    return res.status(404).json({error:"Not Found"});
                }
                if(note.user.toString()!==req.user.id){
                    return res.status(401).json({error:"Not Allowed"});
                }
                note=await Note.findByIdAndDelete(req.params.id);
                // console.log(note);
                res.status(200).json({message:"Note has been deleted",note});
            }
            catch(error){
                res.status(500).json({error:"Internal Server Error"});
                console.log("deletenote: "+error.message)
            }
        })
        
        module.exports=router;
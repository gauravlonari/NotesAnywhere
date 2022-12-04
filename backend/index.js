const express=require('express')
const connectDB=require('./db.js');
const dotenv= require("dotenv")
const path=require('path')
const cors=require("cors")

const port = 5000
const app=express();

require('dotenv').config({path: path.relative(process.cwd(), path.join(__dirname,'.env'))});

const startApp=async ()=>{
  if(await connectDB()){ 
    app.use(express.json())
    app.use(cors());
    app.use("/api/auth",require('./routes/auth.js'))
    app.use("/api/notes",require('./routes/notes.js'))
    
    app.get('/',(req,res)=>{
      res.sendFile(path.join(__dirname,'/index.html'));
    })

    app.get("/shoutout",(req,res)=>{
      res.send("<h2>NotesAnywhere</h2>");
    })

    app.listen(port, () => {
      console.log(`NotesAnywhere app listening on port ${port}`)
    })
  }
}
startApp();
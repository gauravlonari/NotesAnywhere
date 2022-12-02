const express=require('express')
const connectDB=require('./db.js');
require("dotenv").config();
const cors=require("cors")

const port = 5000
const app=express();

const startApp=async ()=>{
  if(await connectDB()){ 
    app.use(express.json())
    app.use(cors());
    app.use("/api/auth",require('./routes/auth.js'))
    app.use("/api/notes",require('./routes/notes.js'))
  
    app.get('/', (req, res) => {
      res.send('Homepage!')   
    })
  
    app.get('/shoutout',(req,res)=>{res.json({name:"NotesAnywhere"});})
  
    app.listen(port, () => {
      console.log(`NotesAnywhere app listening on port ${port}`)
    })
  }
}
startApp();
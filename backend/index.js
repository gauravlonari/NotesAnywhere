const express=require('express')
const connectDB=require('./db.js');
require("dotenv").config();

const port = 5000
const app=express();
connectDB();

app.use(express.json())
app.use("/api/auth",require('./routes/auth.js'))
app.use("/api/notes",require('./routes/notes.js'))

app.get('/', (req, res) => {
  res.send('Homepage!')   
})

app.get('/saymyname',(req,res)=>{res.send("Gaurav Lonari");})

app.listen(port, () => {
  console.log(`NotesAnywhere app listening on port ${port}`)
})

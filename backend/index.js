const express=require('express')
const connectToMongo=require('./db.js');

const port = 3000
const app=express();
// connectToMongo();

app.get('/', (req, res) => {
  res.send('Hello User!')   
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/saymyname',(req,res)=>{res.send("Gaurav Lonari")})


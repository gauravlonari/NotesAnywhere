const { default: mongoose, mongo } = require("mongoose");
const mongoURI="mongodb://localhost:27017/notesanywhere";

function connectToMongo(){
    console.log("Connecting to Database")
    mongoose.connect(mongoURI,(err,db)=>{
        // console.log("returning")
        if(err){
            console.log("Error Connecting Server: "+err);
        }
        else{
            console.log("Connected to MongoDB");
        }
    });
}

module.exports=connectToMongo;
const { default: mongoose, mongo } = require("mongoose");
const mongoURI="mongodb://localhost:27017/notesanywhere";

async function connectToMongo(){
    console.log("Connecting to Database")
    try{
        await mongoose.connect(mongoURI)
        console.log("Connected to Database");
        return true;
    }
    catch(e){
        console.log(e.message);
        return false;
    }   
}

module.exports=connectToMongo;
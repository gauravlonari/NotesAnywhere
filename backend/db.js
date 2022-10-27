const { dblClick } = require("@testing-library/user-event/dist/click");
const { type } = require("@testing-library/user-event/dist/type");
const { default: mongoose, mongo } = require("mongoose");
const mongoURI="mongodb://localhost:27017";

function connectToMongo(){
    // console.log("connecting")
    mongoose.connect(mongoURI,(err,db)=>{
        // console.log("returning")
        if(err){
            console.log("Error Connecting Server "+err);
        }
        else{
            console.log("Connected to MongoDB Server");
        }
    });
}

module.exports=connectToMongo;
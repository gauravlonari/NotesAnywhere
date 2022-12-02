const mongoose=require('mongoose')
// console.log(mongoose)
const {Schema}=mongoose;

const UserSchema = new Schema({
    name:{type:String,required:true},
    password:{type:String,required:true},
    dateCreated:{type:Date,default:Date.now},
    email:{
        type:String,
        required:true,
        unique:true
    },
})

const User= mongoose.model("user",UserSchema);
// User.createIndexes();
module.exports=User;
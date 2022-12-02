const mongoose=require('mongoose')
const {Schema}=mongoose;

const NotesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
    },
    title:{type:String,required:true},
    description:{type:String,required:true},
    dateCreated:{type:Date,default:Date.now},
    tag:{
        type:String,
        default:"General"
    },
})

module.exports= mongoose.model("note",NotesSchema);
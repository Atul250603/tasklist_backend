const mongoose=require('mongoose');
const {Schema}=mongoose;
const taskSchema=new Schema({
    title:String,
    description:String,
    status:{
        type:String,
        default:"Pending"
    },
    createdOn:{
        type:Date,
        default:Date.now
    },
    user:String
})
module.exports=mongoose.model('task',taskSchema);
require('dotenv').config();
const mongoose=require('mongoose');
const mongoURI=process.env.MONGO_URI;
const connectToDB=async()=>{await mongoose.connect(mongoURI)};
module.exports=connectToDB;
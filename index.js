require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const mongodb=require('mongodb');
const cors=require('cors');
const app=express();
let port=process.env.PORT||5000;
const model=require('./schema');
const connectToDB=require('./db');
app.use(express.json());
app.use(cors());
connectToDB();
//To fetch all the tasks
app.post('/',async(req,res)=>{
    try{
    let allTasks=await model.find({user:req.body.email});
    if(!allTasks)throw "Error In Fetching Your Tasks"
    res.status(200).json({tasks:allTasks});
    }
    catch(error){
        res.status(500).json({error:error});
    }
});

//To create a new task
app.post('/createTask',async(req,res)=>{
    try{
    let task=req.body;
    let newTask=new model(task);
    let savedTask=await newTask.save();
    if(!savedTask || savedTask===null || savedTask===undefined){
        throw "Error In Adding The Task";
    }
    res.status(200).json({success:"Added task to the list",task:savedTask});
    }
    catch(error){
        res.status(500).json({error:error});
    }
});

//To update the status of a particular task

app.put('/updateTask/:taskId',async(req,res)=>{
    try{
    let taskId=(req.params.taskId).trim();
    const updatedTask=await model.findByIdAndUpdate({_id:taskId},{'$set':{status:'Completed'}});
    if(!updatedTask || updatedTask===null || updatedTask===undefined){
        throw "Error in updating the status of the task";
    }
        res.status(200).json({success:"Successfully updated the status of the task"});
    }
    catch(error){
        res.status(500).json({error:error});
    }
});

//To delete a particular task

app.post('/deleteTask/:taskId',async(req,res)=>{
    try{
    let taskId=(req.params.taskId).trim();
    const deletedTask=await model.deleteOne({_id:taskId,email:req.body.email});
    if(!deletedTask|| deletedTask===null|| deletedTask===undefined){
        throw "Error in deleting the status of the task";
    }
        res.status(200).json({success:"Successfully deleted the task"});
    }
    catch(error){
        res.status(500).json({error:error});
    }
});

app.listen(port,()=>{
    console.log("Server Started on Port",port);
})
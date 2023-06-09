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
app.get('/',async(req,res)=>{
    try{
    let allTasks=await model.find({});
    res.status(200).json({tasks:allTasks});
    }
    catch(err){
        res.status(500).json({error:err});
    }
});

//To create a new task
app.post('/createTask',async(req,res)=>{
    try{
    let task=req.body;
    let newTask=new model(task);
    let savedTask=await newTask.save();
    if(!savedTask || savedTask===null || savedTask===undefined){
        res.status(500).json({error:"Error in adding the task"});
    }
    res.status(200).json({success:"Added task to the list"});
    }
    catch(err){
        res.status(500).json({error:err});
    }
});

//To update the status of a particular task

app.put('/updateTask/:taskId',async(req,res)=>{
    let taskId=(req.params.taskId).trim();
    const updatedTask=await model.findByIdAndUpdate({_id:taskId},{'$set':{status:'Completed'}});
    if(!updatedTask || updatedTask===null || updatedTask===undefined){
        res.status(500).json({error:"Error in updating the status of the task"});
    }
    else{
        res.status(200).json({success:"Successfully updated the status of the task"});
    }
});

//To delete a particular task

app.delete('/deleteTask/:taskId',async(req,res)=>{
    let taskId=(req.params.taskId).trim();
    const deletedTask=await model.findOneAndRemove({_id:taskId});
    if(!deletedTask|| deletedTask===null|| deletedTask===undefined){
        res.status(500).json({error:"Error in deleting the status of the task"});
    }
    else{
        res.status(200).json({success:"Successfully deleted the task"});
    }
});

app.listen(port,()=>{
    console.log("Server Started on Port",port);
})
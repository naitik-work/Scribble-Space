//server create krna aur config krna
const express= require("express");
const app= express();
const noteModel= require('./models/note.model');

//middleware
app.use(express.json());

//create note API call
app.post("/api/notes",async (req,res)=>{
    const {title, description}= req.body;
    const note= await noteModel.create({
        title,description
    })

    res.status(201).json({
        message: "Note created successfull!",
        note
    })

})

//fetch all note API call
app.get("/api/notes",async (req,res)=>{

    const notes= await noteModel.find();
    
    res.status(200).json({
        message:"All notes fetched successfull",
        notes
    })
})

//delete note API call
app.delete("/api/notes/:id",async (req,res)=>{
    const id= req.params.id;

    await noteModel.findByIdAndDelete(id);

    res.status(200).json({
        message:"Note deleted successfully",
    })
})

//patch to update note
app.patch('/api/notes/:id',async (req,res)=>{
    const id = req.params.id
    const {title, description}= req.body;

    await noteModel.findByIdAndUpdate(id,{title, description});

    res.status(200).json({
        message:"Note Updation Successfull."
    })
})



module.exports= app;
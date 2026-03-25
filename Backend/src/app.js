//server create krna aur config krna
const express= require("express");
const app= express();
const noteModel= require('./models/note.model');

//middleware
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

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
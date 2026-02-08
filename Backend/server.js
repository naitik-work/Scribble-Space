//server start krna aur database se connect krna
require('dotenv').config(); //to use variable created in .env file
const mongoose= require("mongoose");
const app= require('./src/app');
const connectToDb= require('./src/config/database');

connectToDb(); //DB connected


app.listen(3000,()=>{
    console.log("Server is running at port 3000.")
})
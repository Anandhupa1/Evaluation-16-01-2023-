const express = require('express');
const app  = express();
const connection=require('./config/connection');
const { loginRouter } = require('./routes/login');
const { postRouter } = require('./routes/notes');
const { regRouter } = require('./routes/register');
const cors = require('cors');
app.use(cors())
require('dotenv').config();

app.use(express.json())
app.get("/",async (req,res)=>{
    res.send("home page")
})
//________________________
app.use("/users/register",regRouter);
app.use("/users/login",loginRouter);
app.use('/posts',postRouter);

//________________________



app.listen(process.env.port, async(req,res)=>{
    try{
    await connection ;
    console.log('connected to remote db')

    }catch(err){
        console.log("_________errror :mongodb atlas connection")
    }
    console.log(`server started at http://localhost:${process.env.port}`)
})
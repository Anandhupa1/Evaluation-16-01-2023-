const express = require('express');
const bcrypt = require('bcryptjs');
const { userModel } = require('../models/register.model');
const regRouter = express.Router();



regRouter.post("/",async (req,res)=>{
let email1 = req.body.email ;
let userExists = await userModel.findOne({email:email1});
if(userExists){res.status(409).json({"err":"user already exists , please login"})}
else{
    let {email , name,password, gender}=req.body;
    if(!email||!name || !password || !gender){
        res.status(422).json({error:"please fill all the details"});
    }else{
        let newUser = new userModel(req.body);
        await newUser.save();
        res.send(newUser)
    
    
    }
    
}



});


module.exports={regRouter}
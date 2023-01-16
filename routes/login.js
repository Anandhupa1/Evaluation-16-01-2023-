const express = require('express');
const bcrypt = require('bcryptjs');
const { userModel } = require('../models/register.model');
const loginRouter = express.Router();
const jwt = require('jsonwebtoken');


loginRouter.post('/',async(req,res)=>{
    try{
        let {email, password}=req.body;
        if(!email || !password){res.status(422).json({error:"please fill all the entries"})}
        else {
        
        let userData = await userModel.findOne({email});
        //res.send(userData)
        if(!userData){res.status(404).json({error:"user doesn't exists"})}
        else{
        const  token = jwt.sign({ userId: userData._id }, 'masai');
        res.send({msg:`welcome ${userData.name}`,authToken :token})
        }
        
        //__________________________________________
        }
    }catch(err){
        console.log("_________error :post :loginRouter");
        console.log(err)
    }



})


module.exports={loginRouter};


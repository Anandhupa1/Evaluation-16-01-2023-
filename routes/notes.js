const express = require('express');
const { auth } = require('../middlewares/auth');
const { postModel } = require('../models/post.model');

const postRouter = express.Router();

//get
postRouter.get("/",async (req,res)=>{
    let q = req.query;
    let {device,device1,device2}=q;
if(device){
    let data = await postModel.find({device});
    res.send(data)
}
else if(device1 && device2){
    let data = postModel.find({$or:[{device:device1},{device:device2}]});
    res.send(data)
}
else{
    let data =await postModel.find();
    res.send(data)
}
})

//post
postRouter.post('/',auth,async(req,res)=>{
    
try{
//________________________________________
let newPost = new postModel(req.body);
await newPost.save();
res.status(200).json({msg:"note creted",details: newPost})


//________________________________________
}
catch(err){
    console.log("__________error : post :posting ");
    console.log(err);
}




})
//patch
postRouter.patch('/update/:id',auth,async(req,res)=>{
    
    try{

let item = await postModel.findById(req.params.id);
console.log(item)
let val  = req.body.userId==item.userId;
if(!val){res.status(401).json({err:"you dont have acces to do this"})}
else{
 let data = await postModel.findByIdAndUpdate({_id:req.params.id},req.body,{new:true});
 res.send(data)

}




    //________________________________________
    // let newPost = new postModel(req.body);
    // await newPost.save();
    // res.status(200).json({msg:"note creted",details: newPost})
    //________________________________________
    }
    catch(err){
        console.log("__________error : post :posting ");
        console.log(err);
    }
    
    
    
    
    })


//delete
postRouter.delete('/delete/:id',auth,async(req,res)=>{
    
    try{

let item = await postModel.findById(req.params.id);
console.log(item)
let val  = req.body.userId==item.userId;
if(!val){res.status(401).json({err:"you dont have acces to do this"})}
else{
 let data = await postModel.findByIdAndRemove({_id:req.params.id});
 res.send("deleted successfully")

}




    //________________________________________
    // let newPost = new postModel(req.body);
    // await newPost.save();
    // res.status(200).json({msg:"note creted",details: newPost})
    //________________________________________
    }
    catch(err){
        console.log("__________error : delete :post ");
        console.log(err);
    }
    
    
    
    
    })








postRouter.get("/",async(req,res)=>{
    res.send("hetusoidfh")
})





module.exports={postRouter}
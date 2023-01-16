const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema({
    name :String,
    email :String,
    gender:String,
    password:String
});


userSchema.pre('save',async function(next){

    if(this.isModified('password')){
     this.password = await bcrypt.hash(this.password,10);
    
    }
     next();
 });


//__________________________________________________
const userModel = mongoose.model("user",userSchema);
module.exports={userModel}
const jwt = require('jsonwebtoken');




let auth = async(req,res,next)=>{
    //___token verification starts;
    let incToken = req.headers.authtoken;
    await jwt.verify(incToken, 'masai', function(err, decoded) {
    if(err){res.status(401).json({error:"unauthorized"})}
    else {
        req.body.userId =decoded.userId;
        next();
    }

    });
   //_________token verified ______________


}




module.exports={auth}
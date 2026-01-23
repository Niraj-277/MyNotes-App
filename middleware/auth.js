const jwt=require('jsonwebtoken')
const User=require('../models/user');

exports.protect=async (req,res,next) => {
    let token;

    //check for token in headers
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token){
        return res.status(401).json({success:false,error:'Not authorised'})
    }
    try{
        //verify token
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        //Attach user to the request object
        req.user= await User.findById(decoded.id);

        next();
    }catch(err){
        return res.status(401).json({success:false,error:'Not authorized'})
    }
}
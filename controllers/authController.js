const User=require('../models/user');

// @desc  Register User
// @route Post /api/v1/auth/register

exports.register=async(req,res,next)=>{
    try{
        const {name,email,password,role}=req.body;

        //1. Create user

        const user= await User.create({
            name,
            email,
            password,
            role
        });
        //create token
        const token = user.getSignedJwtToken();

        res.status(200).json({success:true,token});
    }catch(err){
        res.status(400).json({success:false,error:err.message});
    }
};

//@desc Login user
//@route Post /api/v1/auth/login

exports.login=async(req,res,next)=>{
    try{
        const {email,password}=req.body;

        //Validate email &password
        if(!email || !password){
            return res.status(400).json({
                success:false,
                error:'please provide as email and password'
            })
        }

        // check for user
        const user= await User.findOne({email}).select('+password');

        if(!user){
            return res.status(401).json({success:false,error:'Invalid credentials'})
        }
        //check if password matches
        const isMatch=await user.matchPassword(password);

        if(!isMatch){
            return res.status(401).json({success:false,error:'Invalid credentials'})
        }

        //create token
        const token=user.getSignedJwtToken();

        res.status(200).json({success:true,token});
    }catch(err){
        res.status(400).json({success:true,error:err.message});
    }
}
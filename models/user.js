const mongoose= require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please add a name']
    },
    email:{
        type:String,
        required:[true,'please add email'],
        unique:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email']
        },
        password:{
            type:String,
            required:[true,'please add a valid email'],
            minLength:6,
            select:false,//hide password by default
        },
        role:{
            type:String,
            enum:['user','admin'],
            default:'user',
        },
        created_at:{
            type:Date,
            default:Date.now
        }
});
// 1. Encrypt the password using bcrypt
UserSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt =await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    console.log(this.password);
})

//2. Sign JWT and return 

UserSchema.methods.getSignedJwtToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    });
};

//3. Match user entered Password to hashed password in database 

UserSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

module.exports=mongoose.model('User',UserSchema);
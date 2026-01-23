const mongoose = require('mongoose')

const noteSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Please add a title'],
        trim:true,
        maxlength:[100,'Title cannot be more than 100 characters']
    },
    text:{
        type:String,
        required:[true,'please add the note content']
    },
    category:{
        type:String,
        enum:['Work','Personal','Ideas','Urgent'],
        default:'Personal'
    },
    //---- The relationship -----

    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('Note',noteSchema);
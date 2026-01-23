const Note=require('../models/note')

// @desc Create new note
// @route Post /api/v1/notes
// @access Private

exports.createNote=async(req,res,next)=>{
    try{
        //Add user to req.body
        // This is the "Stamping " process
        req.body.user=req.user.id;

        const note=await Note.create(req.body);

        res.status(201).json({
            success:true,
            data:note
        });
    }catch (err){
        res.status(400).json({
            success:false,
            error:err.message
        })
    }
}


// @desc Get all the notes for the logged in user
// @route Get /api/v1/notes
// @access private

exports.getNotes=async(req,res,next)=>{
    try{
        //IMPORTANT : we only find notes where user matches the logged-in user id
        const notes= await Note.find({user:req.user.id})

        res.status(200).json({
            success:true,
            count:notes.length,
            data:notes
        })
    }catch(err){
        res.status(400).json({
            success:false,
            error:err.message
        })
    }
}
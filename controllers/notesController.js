const Note=require('../models/note')

// @desc Create new note
// @route Post /api/v1/notes
// @access Private

exports.createNote=async(req,res,next)=>{
    try{
        //1.validate Input
        const {error}=noteSchema.validate(req.body);
        if(error){
            return res.status(400).json({success:false,error:error.details[0].message});
        }


        //Add user to req.body
        // This is the "Stamping " procesks
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
//@desc update note
//@route PUt /api/v1/notes/:id

exports.updateNote=async (req,res,next)=>{
    try{
        let note = await Note.findById(req.params.id);

        if(!note){
            return res.status(404).json({
                success:false,
                error:'note not found '
             })
        }

        //The ownership check
        //Make sure the user is the owner of the note 
        if(note.user.toString()!==req.user.id){
            return res.status(400).json({
                success:false,
                error:'user is not authorised'
            })
        }

        note = await Note.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
        });
        res.status(200).json({
            success:true,
            data:note
        })
    }catch(err){
        res.status(400).json({
            success:false,
            error:err.message
        })
    }
}

//@desc Delete note
//@route api/v1/notes/:id

exports.deleteNote=async(req,res,next)=>{
    try{
        const note=await Note.findById(req.params.id);

        if(!note){
            res.status(404).json({
                success:false,
                error:'Note not found'
            })
        }

        //the ownership check
        if(note.user.toString() !== req.user.id){
            return res.status(401).json({
                success:false,error:'Note is not authorised to delete'
            })
        }
        await note.deleteOne();

        res.status(200).json({
            success:true,
            data:{}
        })

    }catch(err){
        res.status(400).json({success:false,error:err.message})
    }
}
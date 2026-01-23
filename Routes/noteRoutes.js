const express=require('express');
const router=express.Router();

const{getNotes,createNote}=require('../controllers/notesController')
const {protect}=require('../middleware/auth')

router.use(protect);

router.route('/')
    .get(getNotes)
    .post(createNote);

module.exports=router;
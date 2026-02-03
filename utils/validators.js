const Joi= require("joi");

//1. Register Validation
//Checks :name is required , Email must be valid , Password must be strong

const registerSchema=Joi.object({
    name:Joi.string().min(3).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required()
});


//Login validation
//Checks :Email and password are required (we dont check lenght here just presence)

const loginSchema=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required(),
});

//3. Create note validation
//Checks : Title is required and max 50 chars . Text is required 
const noteSchema=Joi.object({
    title:Joi.string().min(1).max(50).required(),
    text:Joi.string().required()
});

module.exports={ registerSchema,loginSchema,noteSchema}
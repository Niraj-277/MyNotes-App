const express= require('express')
const app= express()
const dotenv= require('dotenv') 

//!1. Load config first
dotenv.config();

//! 2. connect to database
const connectDb = require('./config/db')
connectDb();

//! Middleware 
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('api is running...')
})

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})
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

//!mount routers
app.use('/api/v1/auth',require('./Routes/authRoutes'));

app.use('/api/v1/notes',require('./Routes/noteRoutes'))

app.get('/',(req,res)=>{
    res.send('api is running...')
})

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})
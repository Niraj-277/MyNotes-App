const express= require('express')
const app= express()

app.get('/hello',()=>{
    console.log("hello world")
})

const PORT=3000
app.listen(PORT,()=>{
    console.log("server running at 3000")
})
/* This code is creating a basic server using the Express framework in JavaScript. */
const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    res.send('Hello Node...');
})


app.listen(3000,()=>{
    console.log("Server is connected on port 3000");
    
})
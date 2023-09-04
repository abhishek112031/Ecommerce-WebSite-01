const express=require('express');
const cors=require('cors');
const path=require('path');
const dotenv=require('dotenv').config();
// const PORT=3000;

const app=express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')))


//main middlewares:
app.get('/sign-up',(req,res,next)=>{
    res.status(200).sendFile(path.join(__dirname,'public','html','index.html'))
})


app.listen(process.env.PORT ||3000,()=>{
    console.log(`app is running on port: ${process.env.PORT}`)
})
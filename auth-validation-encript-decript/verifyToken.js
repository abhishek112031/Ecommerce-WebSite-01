const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config()
// const User=require('../models/user');
exports.verifytoken=(req,res,next)=>{
    const token=req.cookies.cookietoken;
    console.log(token);
    if(!token){
        throw new Error('token is missing!')

    }
    jwt.verify(token,process.env.SECRET_KEY,(err,decode)=>{
        if(err){
            throw new Error('unauthorized!')
        }
        else{
            req.user=decode;
            next();
        }
    })

}


const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
const Admin=require('../models/admin')
dotenv.config()
const path=require('path');
// const User=require('../models/user');
exports.verifytoken=(req,res,next)=>{
    const token=req.cookies.cookietoken;
    console.log(token);
    if(!token){
        throw new Error('token is missing!');

    }
    jwt.verify(token,process.env.SECRET_KEY,(err,decode)=>{
        if(err){
            // throw new Error('unauthorized:time has expired! please log in again!')
       
            res.redirect('/sign-up')
        }
        else{
            req.user=decode;
            next();
        }
    })

}

exports.verifyAdminToken=async(req,res,next)=>{
    try{
        const token=req.header('Authorization');
        // console.log(token);
        
        const admin=jwt.verify(token,'adminsecretkey');//decript the token
        // console.log("USERID>>>>>>>>",user.userId);

       Admin.findById(admin.adminId).then(admin=>{
            req.admin=admin;
            next();
        })

    }
    catch(err){
        // console.log(err);
        return res.status(401).json({success:false});

    }
}


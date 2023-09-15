const jwt=require('jsonwebtoken');
const dotenv=require('dotenv').config()

function generateToken(userId,userName){
    return jwt.sign({userId:userId,name:userName},process.env.SECRET_KEY,{expiresIn:'20d'})
};

module.exports=generateToken;




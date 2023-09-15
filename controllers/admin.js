const path=require('path');
const Admin=require('../models/admin');

const jwt=require('jsonwebtoken');

function generateToken(adminId,adminName){
    return jwt.sign({adminId:adminId,adminName:adminName},'adminsecretkey',{expiresIn:'1hr'});

}

exports.getAdminLoginPage=async(req,res,next)=>{
    res.status(200).sendFile(path.join(__dirname,'..','public','html','admin.html'));
}

exports.postLogin=async(req,res,next)=>{
    const{password,userName}=req.body;
    // const encriptedPassword=btoa(password);
    // console.log(password,userName);

    const admin=await Admin.find();
    // console.log(admin)
    if(admin.length){

        const dbAdminId=admin[0]._id;
        const dbAdminName=admin[0].adminName;
        const dbAdminPw=admin[0].password;
        const decodePassword=atob(dbAdminPw);
        console.log(dbAdminId,dbAdminName,dbAdminPw,decodePassword,password)



        if( decodePassword===password && userName===dbAdminName ){
            // console.log(true)
            res.status(200).json({message:'login successful',token:generateToken(dbAdminId.toString(),dbAdminName)});
        }
        else{
            // console.log(false)
            res.status(400).json({message:'something went wrong! '})
        }
    }
    else{
        res.status(404).json({message:'not found:something went wrong! '})
    }


}

exports.getAdminDashboard=async(req,res,next)=>{
    // console.log('admin---->>',req.admin);
    res.status(200).sendFile(path.join(__dirname,'..','public','html','admin-dashboard.html'))
}
const express=require('express');
const router=express.Router();

const userController=require('../controllers/user.js')
const verifyToken = require('../auth-validation-encript-decript/verifyToken');


router.get('/sign-up',userController.getSignupUserPage);
router.post('/sign-up',userController.postSignupUser);
router.post('/login',userController.postLogIn);
router.get('/user-dashboard',userController.userDashBoard);


// /admin/all-products


module.exports= router;
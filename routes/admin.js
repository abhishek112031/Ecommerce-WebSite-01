const express=require('express');
const router=express.Router();
const adminController=require('../controllers/admin');
const verifyToken = require('../auth-validation-encript-decript/verifyToken');

router.get('/admin',adminController.getAdminLoginPage);
router.post('/admin-login',adminController.postLogin);
// router.get('/admin-dashboard',verifyToken.verifyAdminToken,adminController.getAdminDashboard);
router.get('/admin-dashboard',adminController.getAdminDashboard);


module.exports=router;
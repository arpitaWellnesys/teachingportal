var express = require ('express');
var router = express.Router();
var app = require("@forkjs/group-router");
var middleware = require("../middleware/auth");

var ProfileController = require("../controller/ProfileController");
var AuthController = require("../controller/AuthController");
var UserController = require("../controller/UserController");
var FamilarityController = require("../controller/FamilarityController");

router.get('/familarities',FamilarityController.list);
router.post('/login',AuthController.login);
router.post('/register',AuthController.register);
router.post('/forget-password',AuthController.forgetPassword);
router.post('/verify-otp',AuthController.verifyOtp);
router.post('/resend-otp',AuthController.resendOtp);
router.post('/google-login',AuthController.googleLogin);
router.post('/reset-password',AuthController.resetPassword);

// After Login Routes 
router.get('/teacher-status/:id/:status',middleware.checkToken,UserController.statusUpdate);
router.get('/user-details', UserController.details);
router.get('/teacher-list', UserController.teacherList);
router.post('/profile',middleware.checkToken, ProfileController.profile);

module.exports = router;

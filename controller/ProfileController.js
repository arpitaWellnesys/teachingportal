require('dotenv').config();
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
var user = require("../model/Users");
var emails = require("../controller/Helper/helper");
var app_url = "http://localhost:4200/";
var profile = require("../model/TeacherDetails");
const { data } = require('jquery');

exports.profile = ((req,res)=>{
    req.body.teacher_id = decoded.user_id;
    $data = req.body;

    profile.create(req.body).then((users)=>{
        user.findByIdAndUpdate(req.body.teacher_id,{$set : {profile_status : 1}}).then((data)=>{
            return res.json({ success : true, message : "Profile Created Successfully!!", data : data });
        }).catch((error) => {
            return res.json({ success : false, message : "User Not Found!!", data : error });
        });
        // return res.json({ success : true, message : "Profile Created Successfully!!", data : users });
    }).catch((error) => {
        return res.json({ success : false, message : "Something went wrong!", data : error });
    });    
});

module.exports = exports;


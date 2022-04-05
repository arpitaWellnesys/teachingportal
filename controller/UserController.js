require('dotenv').config();
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
var user = require("../model/Users");
var emails = require("../controller/Helper/helper");
var app_url = "http://localhost:4200/";

exports.details = ((req,res)=>{
    token = req.headers['x-access-token'];
    jwt.verify(token, process.env.TOKEN_KEY, function(err, decoded) {      
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });    
        } else {
          if(decoded.user_id != ""){
            user.findById(decoded.user_id).then((user)=>{
                return res.json({success : true , message : "User Deatils" , data : user});
            }).catch((error)=>{
                return res.json({success : false , message : "Invalid User Id" , data : error});
            });
        }else{
            return res.json({success : false , message : "Something went wrong!!" , data : []});
          }
        }
    });
});

exports.teacherList = ((req,res)=>{
    token = req.headers['x-access-token'];  
    jwt.verify(token, process.env.TOKEN_KEY, function(err, decoded) {      
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });    
        } else {
          if(decoded.user_id != ""){
            user.aggregate([
                {
                    $match : {user_type : "teacher" 
                    // acc_verify : 0
                }
                },
                { $lookup :
                    {
                        from: 'teacherdetails',
                        localField: '_id',
                        foreignField: 'teacher_id',
                        as: 'teacherdetails'
                    }
                },
                // {
                //     $unwind: "$teacherdetails"
                // }
                
            ]).then((user)=>{
                return res.json({success : true , message : "Teachers Deatils" , data : user});
            }).catch((error)=>{
                return res.json({success : false , message : "Records not found" , data : []});
            });
          }else{
            return res.json({success : false , message : "Something went wrong!!" , data : []});
          }
        }
      });
    
})

exports.statusUpdate = ((req,res)=>{
    id = req.params.id; state = req.params.status;
    user.findByIdAndUpdate({ _id : id }, { $set : { acc_verify : state}}).then((user)=>{
        if(state == 1){
            return res.json({success : true , message : "Teacher Approved Successfully!!" , data : user});
        }else if(state == 2){
            return res.json({success : false , message : "Teacher Declined Successfully!!" , data : user});
        }
    }).catch((error)=>{
        return res.json({success : false , message : "Invalid Id" , data : error});
    });
})


module.exports = exports;
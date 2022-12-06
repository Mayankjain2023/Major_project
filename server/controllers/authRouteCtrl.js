var User = require("../models/UserModel");
var Org=require("../models/OrgModel");
var bcrypt=require("bcryptjs");
var jwt=require('jsonwebtoken');

var authenticate={
    // register:function(req,res){

    //     var user=new User();
    //     user.user_name=req.body.user_name;
    //     user.email=req.body.email;
    //     user.password=req.body.password;
  
    //     bcrypt.genSalt(10, function(err, salt){
    //         bcrypt.hash(user.password, salt, function(err, hash){
    //           if (err) 
    //           {
    //             res.status(500).json({status:'error',message:'Bcrypt Error:'+err,token:''});
    //             return;
    //           }

    //           user.password = hash;

    //           user.save(function(err){
    //             if(err){
    //                 res.status(500).json({status:'error',message:'Database Error:'+err,token:''});
    //             }else{
    //                 var payload={email:user.email,id:user.id};
    //                 var secret="SECRET";
    //                 var token=jwt.sign(payload,secret,{expiresIn:'1d'});
    //                 res.status(200).json({status:'success',message:'SignUp successful',token:"Bearer "+token});
    //             }
    //             });
    //         });
    //     });

        
    // },

    createUser:function(req,res){

        

        Org.find({orgname:req.body.orgname}).then(function(org){
            console.log(org._id);
            console.log(org.users);
            console.log(org.orgname);

            if(!org){
                return res.status(401).json({statue:"Error",message:"Organization not found"})
            }
            var user={
                username:req.body.username,
                email:req.body.email,
                role:"Member"
            }
            
            var org=Org();
            org.users.push(user);
            console.log(org.users);

            console.log(req.body);

        var user=new User();
        user.username=req.body.username;
        user.email=req.body.email;
        user.password=req.body.password;
        user.team=req.body.teamname;

        // user.org=req.body.org;
  
        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(user.password, salt, function(err, hash){
              if (err) 
              {
                res.status(500).json({status:'error',message:'Bcrypt Error:'+err,token:''});
                return;
              }

              user.password = hash;

              user.save(function(err){
                if(err){
                    res.status(500).json({status:'error',message:'Database Error:'+err,token:''});
                }else{
                    var payload={email:user.email,id:user.id};
                    var secret="SECRET";
                    var token=jwt.sign(payload,secret,{expiresIn:'1d'});
                    res.status(200).json({status:'success',message:'User added successfully',token:"Bearer "+token});
                }
                });
            });
        });


        })

        
},

    login: function(req,res){

        User.findOne({email:req.body.email}).then(function(user){
            if(!user)
            {
                return res.status(401).json({status:'error',message:'User not found',token:''});
            }
            bcrypt.compare(req.body.password,user.password)
            .then(function(same){
                    if(!same)
                    {
                        return res.status(401).json({status:'error',message:'Incorrect password',token:''});
                    }

                var payload={email:user.email,id:user.id};
                var secret="SECRET";
                var token=jwt.sign(payload,secret,{expiresIn:'1d'});
                return res.status(200).json({status:'success',message:'SignIn successful',token:"Bearer "+token});
            });
        })
    },

    updatepwd:function(req,res){

        User.findOne({email:req.body.email}).then(function (user){
            if(!user)
            {
                return res.status(401).json({status:'error',message:'User not found',token:''});
            }
            var newPassword=req.body.newpwd;
            
            bcrypt.genSalt(10, function(err, salt){
                bcrypt.hash(newPassword, salt, function(err, hash){
                  if (err) 
                  {
                    res.status(500).json({status:'error',message:'Bcrypt Error:'+err});
                    return;
                  }
                user.password = hash;
                User.updateOne({
                      $set:{password:user.password}
                    }).then(function (success){
                        return res.status(200).json({status:"success",message:"Password Updated"});
                    });
                  
                });
            });


           

        })
    },

    create:function(req,res){
        User.findOne({email:"superadmin@gmail.com"})
        .then(function(user){
            if(!user){
                
                var admin=new User();
                admin.username="SuperAdmin";
                admin.email="superadmin@gmail.com";
                admin.password="Superadmin@1234";

                admin.isSuperAdmin=true;
                bcrypt.genSalt(10, function(err, salt){
                    bcrypt.hash(admin.password, salt, function(err, hash){
                      if (err) 
                      {
                        res.status(500).json({status:'error',message:'Bcrypt Error:'+err});
                        return;
                      }
                      admin.password = hash;
                      admin.save(function(err){
                        if(err){
                            res.status(500).json({status:'error',message:'Database Error:'+err});
                        }else{
                            res.status(200).json({status:'success',message:'Super admin created'});
                        }
                        });
                    });
                });
            }
            else{
                res.status(200).json({status:"success",message:"Super Admin already existed"});
            }
        })
    }
}
module.exports=authenticate;
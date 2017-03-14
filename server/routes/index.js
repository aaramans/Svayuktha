require('../models/connect');
var pwdHash = require('password-hash');
var randomstring = require("randomstring");
var Schema = require('../models/schema');
var User = Schema.User;

/*
* Login functionality
*/
exports.signIn = function(req, res){
    console.log(":: Sign in :: ", req.body);
    if(req.body && req.body.username && req.body.password){
        User.findOne({username : req.body.username},function(err, user){
            if(err){
                res.send({"status":false,"message":"This is not a registered username"});
            }else{
                if(user){
                    if(pwdHash.verify(req.body.password, user.password)){
                        user.accessToken = randomstring.generate(12);
                        user.save(function(err, usrObj){
                            if(err){
                                res.send({"status":false,"message":"Unable to fetch the record"});
                            }else{
                                res.send({"status":true,"message":"Logged in Successfully", "response":usrObj});
                            }
                        });
                    }else{
                        res.send({"status":false,"message":"Your password is incorrect"});
                    }
                }else{
                    res.send({"status":false,"message":"Username is not registered"});
                }
            }
        });
    }else{
        res.send({"status":false,"message":"Invalid Request"});
    }
};

/*
* Logout functionality
*/
exports.signOut = function(req, res){
    console.log(":: Sign out :: ", req.body);
    if(req.body && req.body.username && req.body.accessToken){
        User.findOne({username: req.body.username},function(err, user){
            if(err){
                res.send({"status":false,"message":"Unable to find the user with this username"});
            }else{
                if(user){
                    if(req.body.accessToken === user.accessToken){
                        user.accessToken = '';
                        user.save(function(err,suc){
                            if(err){
                                res.send({"status":false,"message":"Unable to fetch the record"});
                            }else{
                                res.send({"status":true,"message":"You have been logged out Successfully"});
                            }
                        });
                    }else{
                        res.send({"status":false,"message":"Token error"});
                    }
                }else{
                    res.send({"status":false,"message":"Username is not registered"});
                }
            }
        });
    }else{
        res.send({"status":false,"message":"Invalid Request"});
    }
}

/*
* admin creation
* only to be used for the first time
*/
exports.createAdmin = function(req, res){
    console.log(":: create admin :: ", req.body);
    if(req.body && req.body.accessKey === "qeiurghqwdruil"){
        var user = new User();
        var data = req.body.data;
        user.firstname = data.firstname;
		user.lastname = data.lastname;
		user.username = data.username;
		user.email = data.email;
		user.password = pwdHash.generate(data.password);
		user.mobile = data.mobile;
		user.address = data.address;
		user.status = 'active';
        user.role = 'admin';
        console.log("user created",  user);
        user.save(function(err, user){
            if(err){
                console.log("error" ,err);
                res.send({"status":false,"message":"This is not a registered username"});
            }else{
                res.send({"status":true,"message":"Admin has been created successfully"});
            }
        });
    }else{
        res.send({"status":false,"message":"You are not authorised to make this request"});
    }
};

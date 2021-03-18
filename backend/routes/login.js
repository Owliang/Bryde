var mongo = require('mongodb');
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
const { body, validationResult, check } = require('express-validator');
/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log("aa");
  res.json({ result : 'Response from login page'})  
  //res.render('login');
});
router.post('/',[check("username","Please enter username").not().isEmpty(),
                check("password","Please enter password").not().isEmpty()]
,function(req, res, next) {
    console.log("aa");
    const result = validationResult(req);
    var errors = result.errors;
    if (!result.isEmpty()) {
        res.json({result:false,error:errors})
    }else{
        MongoClient.connect(url, function(err, db) {
            if (err) {
                //res.send(err);
                res.json({result:false,error:err})
            }
            else{
                var dbo = db.db("BrydeTech");
                var user_name = req.body.username;
                var passwd = req.body.password;
                dbo.collection("users").find({"username":user_name,"password":passwd}, { projection: { _id: 0, username: 1 ,password:1} }).toArray(function(err, result) {
                    if (err) {
                        throw err;
                    }
                    if(result.length===0){
                        res.json({ result : false , error : "Invalid username or password" })
                        //res.render('product',{title:'Log in fail'});
                    }
                    else{
                        res.json({ result : true , error : ""})
                        //res.render('product',{title:'Log in success'});
                    }
                    db.close();
                });
            }
        });
    }
});
module.exports = router;

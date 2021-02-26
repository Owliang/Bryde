var mongo = require('mongodb');
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
const { body, validationResult, check } = require('express-validator');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('response fron login page');
});
router.post('/',[check("username","Please enter username").not().isEmpty(),
                check("password","Please enter password").not().isEmpty()]
,function(req, res, next) {
    const result = validationResult(req);
    var errors = result.errors;
    if (!result.isEmpty()) {
        console.log("0")
        //res.render('signup',{errors:errors});
    }else{
        MongoClient.connect(url, function(err, db) {
            if (err) {
                console.log("1")
                res.send(err);
            }
            else{
                var dbo = db.db("BrydeTech");
                var user_name = req.body.username;
                var passwd = req.body.password;
                dbo.collection("users").find({"username":user_name,"password":passwd}, { projection: { _id: 0, username: 1 ,password:1} }).toArray(function(err, result) {
                    if (err) {
                        console.log("2")
                        throw err;
                    }
                    if(result.length===0){
                        console.log("3")
                        res.json({ result : false , error : "Invalid username or password" })
                        //res.render('product',{title:'Log in fail'});
                    }
                    else{
                        console.log("4")
                        res.json({ result : true , error : ""})

                        //res.json({ result : 'Log in fail' })
                        //res.render('product',{title:'Log in fail'});
                    }
                    db.close();
                });
            }
        });
    }
});
module.exports = router;

/*var mongo = require('mongodb');
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
const { body, validationResult, check } = require('express-validator');
/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('signup');
});

router.post('/',[check("username","Please enter username").not().isEmpty(),
                check("password","Please enter password").not().isEmpty()]
,function(req, res, next) {
    const result = validationResult(req);
    var errors = result.errors;
    if (!result.isEmpty()) {
        res.render('signup',{errors:errors});
    }else{
        MongoClient.connect(url, function(err, db) {
            if (err) {
                res.send(err);
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
                        res.send("Invalid or not exist username and password");
                        //res.render('product',{title:'Log in fail'});
                    }
                    else{
                        res.send("OK")
                        //res.render('product',{title:'Log in success'});
                    }
                    db.close();
                });
            }
            /*res.location('/blog/add');
            res.redirect('/blog/add');*/
 /*       });
    }
});
module.exports = router;
*/
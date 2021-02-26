var mongo = require('mongodb');
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
const { body, validationResult, check } = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('response from register page');
});

router.post('/',[
        check("username","Please Input your username").not().isEmpty(),
        check("password","Please Input your password").not().isEmpty(),
        check("fname","Please Input your fname").not().isEmpty(),
        check("lname","Please Input your lname").not().isEmpty(),
        check("ppnumber","Please Input your Prompt Pay Number").not().isEmpty(),
        check("isTutor","Please Input your role").not().isEmpty()
    ], function(req, res, next) {
        const result = validationResult(req);
        var errors = result.errors;
        if (!result.isEmpty()) {
            res.json({result:"error"})
        }
        else {
            MongoClient.connect(url, function(err, db) {
                if (err) {
                    res.send(err);
                    res.json({result:false , error:"cant connect to database"})
                }
                else {
                    var dbo = db.db("BrydeTech");
                    var myobj = { username:req.body.username,
                                password:req.body.password,
                                fname:req.body.fname,
                                lname:req.body.lname,
                                ppnumber:req.body.ppnumber,
                                isTutor:req.body.isTutor};
                    dbo.collection("users").find({"username":req.body.username},
                     { projection: { _id: 0, username: 1} }).toArray(function(err, result) {
                        if (err) {
                            throw err;
                        }
                        if(result.length===0){
                            dbo.collection("users").insertOne(myobj, function(err, res) {
                                if (err) throw err;
                                console.log("1 user insert");
                                db.close();
                            });
                            res.json({ result : true ,error:""})
                        }
                        else{
                            res.json({result:false, error:"This username already registered"})
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
    res.render('register');
});

router.post('/',[
        check("username","Please Input your username").not().isEmpty(),
        check("password","Please Input your password").not().isEmpty(),
        check("fname","Please Input your fname").not().isEmpty(),
        check("lname","Please Input your lname").not().isEmpty(),
        check("ppnumber","Please Input your Prompt Pay Number").not().isEmpty(),
        check("isTutor","Please Input your role").not().isEmpty()
    ], function(req, res, next) {
        const result = validationResult(req);
        var errors = result.errors;
        if (!result.isEmpty()) {
            res.render('register',{errors:errors});
            // return res.status(400).json({ errors: errors.array() });
        }
        else {
            MongoClient.connect(url, function(err, db) {
                if (err) {
                    res.send(err);
                    console.log('HELLO err!', err);
                }
                else {
                    console.log('HELLO not err!');
                    console.log(req.body.username);
                    console.log(req.body.password);
                    console.log(req.body.fname);
                    console.log(req.body.lname);
                    console.log(req.body.ppnumber);
                    var dbo = db.db("BrydeTech");
                    var myobj = { username:req.body.username,
                                password:req.body.password,
                                fname:req.body.fname,
                                lname:req.body.lname,
                                ppnumber:req.body.ppnumber,
                                isTutor:req.body.isTutor};
                    dbo.collection("users").insertOne(myobj, function(err, res) {
                        if (err) throw err;
                        console.log("1 blog insert");
                        db.close();
                    });
                }
                res.location('register');
                res.redirect('register');
            });
        }
});

module.exports = router;
  */
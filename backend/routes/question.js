var mongo = require('mongodb');
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
const { body, validationResult, check } = require('express-validator');
const { UnavailableForLegalReasons } = require('http-errors');
var fs = require('fs');
var multer  = require('multer')

router.get('/', function(req, res, next) {
    if(req.query.subject == ""){
        //res.json({result:req.query.subject});
        MongoClient.connect(url, function(err, db) {
            if (err) {
                throw err;
            }
            else{
                var dbo = db.db("BrydeTech");
                dbo.collection("Q&A").find({}, { projection: { _id: 0, topic:1} }).toArray(function(err, result) {
                    if (err) throw err
                    res.json({result:result});
                    db.close();
                })
            }
        });
    }
    else{
        //res.json({result:req.query.subject});
        MongoClient.connect(url, function(err, db) {
            if (err) {
                throw err;
            }
            else{
                var dbo = db.db("BrydeTech");
                dbo.collection("Q&A").find({"subject":req.query.subject}, { projection: { _id: 0, topic: 1} }).toArray(function(err, result) {
                    if (err) throw err
                    res.json({result:result});
                    db.close();
                })
            }
        });
    }
});
router.post('/',[check("username","Please enter username").not().isEmpty(),
                check("topic","Please enter topic").not().isEmpty()]
,function(req, res, next) {
    const result = validationResult(req);
    var errors = result.errors;
    if (!result.isEmpty()) {
        res.json({result:false,error:errors})
    }else{
        MongoClient.connect(url, function(err, db) {
            if (err) {
                res.json({result:false,error:err})
            }
            else{
                var dbo = db.db("BrydeTech");
                dbo.collection("Q&A").find({"follower":req.body.username,"topic":req.body.topic}, { projection: { _id: 0,topic:1} }).toArray(function(err, result) {
                    if (err) {
                        throw err;
                    }
                    if(result.length === 0 ){
                        follow(req.body.topic,req.body.username);
                        res.json({result:true,description:"follow",error:""})
                    }
                    else{
                        unfollow(req.body.topic,req.body.username);
                        res.json({result:true,description:"unfollow",error:""})
                    }
                    db.close();
                });
            }
        });
        

    }
});
module.exports = router;

function follow(topic,username){
        MongoClient.connect(url, function(err, db) {
            if (err) {
                res.json({result:false,error:err})
            }
            else{
                var dbo = db.db("BrydeTech");
                var myquery = { topic: topic };
                var newvalues = { $push: {follower:username} };
                dbo.collection("Q&A").updateOne(myquery, newvalues, function(err, res) {
                  if (err) throw err;
                  db.close();
                });
            }
        });
}

function unfollow(topic,username){
    MongoClient.connect(url, function(err, db) {
        if (err) {
            res.json({result:false,error:err})
        }
        else{
            var dbo = db.db("BrydeTech");
            var myquery = { topic: topic };
            var newvalues = { $pull: {follower:username} };
            dbo.collection("Q&A").updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
            db.close();
            });
        }
    });
}

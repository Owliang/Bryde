var mongo = require('mongodb');
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
const { body, validationResult, check } = require('express-validator');
const { UnavailableForLegalReasons } = require('http-errors');
var fs = require('fs');
var multer  = require('multer');
const { abort } = require('process');

router.get('/', function(req, res, next) {
    // var topic = ((req.query.topic=="") ? /^/ : req.query.topic )
    // var creator = ((req.query.username=="") ? /^/ : req.query.username )
    var subject = ((req.query.subject=="") ? /^/ : req.query.subject )
    //var q = {"$text":{"topic":topic,"creator":creator,"subject":subject}}
    var q = {"subject":subject,"topic":{$regex:new RegExp(req.query.topic)},"creator":{$regex:new RegExp(req.query.username)}}
    MongoClient.connect(url, function(err, db) {
        if (err) {
            res.json({result:false,error:err})
        }
        else{
            var dbo = db.db("BrydeTech");
            dbo.collection("Q&A").find(q,{ projection: { _id:1,topic:1,creator:1,subject:1,follower:1} }).sort({topic:-1}).toArray(function(err, result) {
                if (err){
                    res.json({result:false , error:err})
                }
                var isFollow = []
                for(i=0;i<result.length;i++){
                    follow = result[i].follower.findIndex(student => student == req.query.student_name);
                    isFollow[i] = (follow == -1) ? false:true;
                }
                res.json({result:result,error:"",isFollow:isFollow});
                db.close();
            })
        }
    });
});
router.post('/',[check("username","Please enter username").not().isEmpty(),
                check("id","Please enter id").not().isEmpty()]
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
                var id = new mongo.ObjectID(req.body.id)
                var username = req.body.username
                dbo.collection("Q&A").find({"follower":req.body.username,_id:id}, { projection: { _id: 0,topic:1} }).toArray(function(err, result) {
                    if (err) {
                        res.json({result:false , error:err})
                    }
                    if(result.length === 0 ){
                        //follow(id,req.body.username);
                        MongoClient.connect(url, function(err, db) {
                            if (err) {
                                res.json({result:false,error:err})
                            }
                            else{
                                var dbo = db.db("BrydeTech");
                                var myquery = { _id: id };
                                var newvalues = { $push: {follower:username} };
                                dbo.collection("Q&A").updateOne(myquery, newvalues, function(err, res) {
                                  if (err) {
                                    res.json({result:false , error:err})
                                  }
                                });
                            }
                        });
                        res.json({result:true,description:"follow",error:""})
                    }
                    else{
                        //unfollow(id,req.body.username);
                        MongoClient.connect(url, function(err, db) {
                            if (err) {
                                res.json({result:false,error:err})
                            }
                            else{
                                var dbo = db.db("BrydeTech");
                                var myquery = { _id: id };
                                var newvalues = { $pull: {follower:username} };
                                dbo.collection("Q&A").updateOne(myquery, newvalues, function(err, res) {
                                if (err) {
                                    res.json({result:false , error:err})
                                }
                                });
                            }
                        });
                        res.json({result:true,description:"unfollow",error:""})
                    }
                    db.close();
                });
            }
        });
        

    }
});
module.exports = router;

/*function follow(id,username){
        MongoClient.connect(url, function(err, db) {
            if (err) {
                res.json({result:false,error:err})
            }
            else{
                var dbo = db.db("BrydeTech");
                var myquery = { _id: id };
                var newvalues = { $push: {follower:username} };
                dbo.collection("Q&A").updateOne(myquery, newvalues, function(err, res) {
                  if (err) {
                    res.json({result:false , error:err})
                  }
                  db.close();
                });
            }
        });
}

function unfollow(id,username){
    MongoClient.connect(url, function(err, db) {
        if (err) {
            res.json({result:false,error:err})
        }
        else{
            var dbo = db.db("BrydeTech");
            var myquery = { _id: id };
            var newvalues = { $pull: {follower:username} };
            dbo.collection("Q&A").updateOne(myquery, newvalues, function(err, res) {
            if (err) {
                res.json({result:false , error:err})
            }
            db.close();
            });
        }
    });
}*/
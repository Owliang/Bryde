var express = require('express');
var mongo = require('mongodb');
var router = express.Router();
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
const { body, validationResult, check } = require('express-validator');
const { UnavailableForLegalReasons } = require('http-errors');
var Binary = require('mongodb').Binary;
var fs = require('fs');
/* GET home page. */

router.get('/', function(req, res, next) {
        MongoClient.connect(url, function(err, db) {
            if (err) {
                res.json({result:false,error:err})
            }
            else{
                var dbo = db.db("BrydeTech");
                var id = new mongo.ObjectID(req.query.id)
                dbo.collection("Q&A").find({_id:id}, { projection: { _id: 0} }).toArray(function(err, result) {
                    if (err) {
                        res.json({result:false,error:err})
                    }
                    follow = result.follower.findIndex(student => student == req.query.student_name);
                    isFollow = (follow == -1) ? false:true;
                    res.json({result:result,isFollow:isFollow});
                    db.close();
                })
            }
        });
});
router.post('/',[check("username","Please enter username").not().isEmpty(),
check("id","Please enter id").not().isEmpty(),check("comment","Please enter comment").not().isEmpty()], function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            res.json({result:false,error:err})
        }
        else{
            var dbo = db.db("BrydeTech");
            var id = new mongo.ObjectID(req.body.id)
            var myquery = { _id:id};
            var newvalues = { $push: {writer:req.body.username,comment:req.body.comment} };
            dbo.collection("Q&A").findOneAndUpdate(myquery, newvalues, function(err, result) {
                if (err){
                    res.json({result:false,error:err})
                }
                res.json({result:true,error:"",id:result.value._id,topic:result.value.topic,latest_comment:req.body.comment,follower:result.value.follower})
                db.close();
            });
        }
    });
});
module.exports = router;

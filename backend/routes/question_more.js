var express = require('express');
var mongo = require('mongodb');
var router = express.Router();
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
var Binary = require('mongodb').Binary;
var fs = require('fs');
/* GET home page. */

router.get('/', function(req, res, next) {
        //res.json({result:req.query.subject});
        MongoClient.connect(url, function(err, db) {
            if (err) {
                throw err;
            }
            else{
                var dbo = db.db("BrydeTech");
                dbo.collection("Q&A").find({topic:req.query.topic}, { projection: { _id: 0,} }).toArray(function(err, result) {
                    if (err) throw err
                    res.json({result:result});
                    db.close();
                })
            }
        });
});
router.post('/', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            throw err;
        }
        else{
            var dbo = db.db("BrydeTech");
            var myquery = { topic: req.body.topic };
            var newvalues = { $push: {comment:req.body.comment} };
            dbo.collection("Q&A").updateOne(myquery, newvalues, function(err, res) {
                if (err) throw err;
                db.close();
            });
        }
    });
    MongoClient.connect(url, function(err, db) {
        if (err) {
            throw err;
        }
        else{
            var dbo = db.db("BrydeTech");
            var myquery = { topic: req.body.topic };
            var newvalues = { $push: {comment:req.body.comment} };
            dbo.collection("Q&A").find({"topic":req.body.topic}, { projection: { _id: 0, follower:1} }).toArray(function(err, result) {
                if (err) {
                    res.json({result:false , error:err})
                }
                res.json({ result : true , result:result,error : ""});
                db.close();
            });
        }
    });
});
module.exports = router;

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
    MongoClient.connect(url, function(err, db) {
        if (err) {
            res.json({result:false,error:err})
        }
        else{
            var dbo = db.db("BrydeTech");
            dbo.collection("Q&A").find({follower:req.query.username}, { projection: { _id: 0,comment:0,follower:0} }).toArray(function(err, result) {
                if (err){
                    res.json({result:false , error:err})
                }
                res.json({result:result});
                db.close();
            })
        }
    });
});
module.exports = router;
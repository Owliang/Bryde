var express = require('express');
var mongo = require('mongodb');
var router = express.Router();
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://13.213.61.131:27017/";
var Binary = require('mongodb').Binary;
var fs = require('fs');
var data = fs.readFileSync('aaa.txt');
console.log(data);
/* GET home page. */

router.get('/', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            throw err;
        }
        else{
            var dbo = db.db("BrydeTech");
            dbo.collection("courses").find({student:req.query.username}).toArray(function(err, result) {
                if (err) throw err
                res.json({result:result});
                db.close();
            })
        }
    });
});
module.exports = router;
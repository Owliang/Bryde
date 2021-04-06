var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
const { body, validationResult, check } = require('express-validator');
const { UnavailableForLegalReasons } = require('http-errors');
/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.query.element == "ads"){
    MongoClient.connect(url, function(err, db) {
      if (err) {
          res.json({result:false , error:err})
      }
      else {
        var dbo = db.db("BrydeTech");
        dbo.collection("ads").find({name:"defalut"},{ projection: { _id:0,photo_buffer:1} }).toArray(function(err, result) {
          if (err) {
            res.json({result:false,error:err})
          }
          db.close();
          res.json({result:true,error:"",data:result[0]})
        });
      }
    });
  }
  else if(req.query.element == "courses"){
    MongoClient.connect(url, function(err, db) {
      if (err) {
          res.json({result:false , error:err})
      }
      else {
        var dbo = db.db("BrydeTech");
        dbo.collection("courses").find({},{ projection: { _id:1,name:1,photo_buffer:1} }).sort({rating:-1}).limit(4).toArray(function(err, result) {
          if (err){
            res.json({result:false , error:err})
          }
          db.close();
          res.json({result:true,error:"",data:result})
        });
      }
    });
  }
  else if(req.query.element == "promotions"){
    MongoClient.connect(url, function(err, db) {
      if (err) {
          res.json({result:false , error:err})
      }
      else {
        var dbo = db.db("BrydeTech");
        dbo.collection("promotions").find({},{ projection: { _id:1,name:1,photo_buffer:1} }).sort({rating:-1}).limit(4).toArray(function(err, result) {
          if (err) {
            res.json({result:false , error:err})
          }
          db.close();
          res.json({result:true,error:"",data:result})
        });
      }
    });
  }
});


module.exports = router;

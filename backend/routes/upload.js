var express = require('express');
var mongo = require('mongodb');
var router = express.Router();
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
var Binary = require('mongodb').Binary;
var fs = require('fs');
var data = fs.readFileSync('aaa.txt');
console.log(data);
/* GET home page. */

router.get('/', function(req, res, next) {
    res.render('upload');
  });
module.exports = router;
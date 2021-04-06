var mongo = require('mongodb');
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
const { body, validationResult, check } = require('express-validator');
const { UnavailableForLegalReasons } = require('http-errors');
var fs = require('fs');
var data = require("./register.js");
var multer  = require('multer')
var upload = multer({ 
  storage:multer.diskStorage({
      destination: function (req, file, cb) {
          // ใช้งาน path module กำหนดโฟลเดอร์ที่จะบันทึกไฟล์
          cb(null, 'uploads/')
      },
      filename: function (req, file, cb) {
          // เปลี่ยนชื่อไฟล์ ในที่นี้ใช้เวลา timestamp ต่อด้วยชือ่ไฟล์เดิม
          // เช่นไฟล์เดิมเป็น bird.png ก็จะได้เป็น  1558631524415-bird.png
          cb(null, file.originalname)
      }
  })
})
/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.render('verification');
  res.json({ result : 'Response from verification page' })  
});
router.post('/',[check("code","Please Input code")], function(req, res, next) {
  const result = validationResult(req);
  var errors = result.errors;
  if (!result.isEmpty()) {
      res.json({result:false,error:errors})
  }
  else if(data.code == req.body.code){
      MongoClient.connect(url, function(err, db) {
          if (err) {
              res.json({result:false , error:err})
          }
          else {
            var dbo = db.db("BrydeTech");
            dbo.collection("users").insertOne(data.myobj,function(err,res){
                if (err) {
                  res.json({result:false , error:err})
                }
                db.close();
            });
            res.json({result:true,error:""})
          }
      });
  }
  else{
    res.json({result:false,error:"Incorrect code"})
  }
});
module.exports = router;




var express = require('express');
var mongo = require('mongodb');
var router = express.Router();
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
var Binary = require('mongodb').Binary;

router.get('/', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            res.json({result:false , error:err})
        }
        else {
          var dbo = db.db("BrydeTech");
          var id = new mongo.ObjectID(req.query.id);
          dbo.collection("courses").find({_id:id},{ projection: {_id:0,name:1,tutor:1,subject:1,price:1,rating:1,video_buffer:1,student:1,photo_buffer:1} }).toArray(function(err, result) {
            if (err) {
              res.json({result:false , error:err})
            }
            db.close();
            video_size = result[0].video_buffer.length
            enroll = result[0].student.findIndex(student => student == req.query.student_name);
            Isenroll = (enroll == -1) ? false : true;
            console.log(video_size,Isenroll)
            data = {name:result[0].name,tutor:result[0].tutor,subject:result[0].subject,price:result[0].price,desciption:result[0].desciption,rating:result[0].rating,video_size:video_size,Isenroll:Isenroll,photo_buffer:result[0].photo_buffer}
            res.json({result:true,error:"",data:data})
          });
        }
      });
});
router.post('/',function(req, res, next) {

});
module.exports = router;
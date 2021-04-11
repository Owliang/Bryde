var express = require('express');
var mongo = require('mongodb');
var router = express.Router();
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
var Binary = require('mongodb').Binary;
var fs = require('fs');
var formidable = require('formidable')
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
/* GET home page. */

router.get('/', function(req, res, next) {
    res.render('edit_course');
    MongoClient.connect(url, function(err, db) {
        if (err) {
          res.json({result:false,error:err})
        }
        else{
            var dbo = db.db("BrydeTech");
            var id = new mongo.ObjectID(req.query.id);
            var myquery = {_id:id};
            dbo.collection("courses").findOne(myquery,function(err,response){
                if (err) {
                    res.json({result:false , error:err})
                }
                else{
                    res.json({result:true,error:"",data:response})
                }
                db.close();
            });
        }
    });  
});
/*router.post('/',course_upload,function(req, res, next) {
        MongoClient.connect(url, function(err, db) {
            if (err) {
              res.json({result:false,error:err})
            }
            else{
                var dbo = db.db("BrydeTech");
                var idd = new mongo.ObjectID(req.body.id);
                var myquery = {_id:idd};
                var newvalues = {$set:{name:req.body.name,
                  price:parseInt(req.body.price),
                  subject:req.body.subject,
                  description:req.body.description,
                  link:req.body.link,
                photo_buffer:fs.readFileSync('uploads/'+req.files['attach_photo'][0].originalname),
                video_buffer:video}}
                dbo.collection("courses").updateOne(myquery,newvalues,function(err,response){
                    if (err) {
                        res.json({result:false , error:err})
                    }
                    db.close();
                });
                res.json({result:true,error:""})
            }
        });
});*/
router.post('/',function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        const result = validationResult(fields);
        var errors = result.errors;
        if (!result.isEmpty()) {
            res.json({ result: false, error: errors })
        }
        else{
            MongoClient.connect(url, function(err, db) {
                if (err) {
                res.json({result:false,error:err})
                }
                else{
                    var dbo = db.db("BrydeTech");
                    var newvalues = {$set:{name:fields.name,price:parseInt(fields.price),description:fields.description,subject:fields.subject,link:fields.link,photo_buffer:fs.readFileSync(files.attatch_photo.path)}}
                    var id = new mongo.ObjectID(fields.id);
                    dbo.collection("courses").updateOne({_id:id},newvalues,function(err,result){
                        if (err) {
                            res.json({result:false , error:err})
                        }
                        else{
                            res.json({result:true,error:""})
                        }
                        db.close();
                    });
                    
                }
            });
        }
    });
});
module.exports = router;
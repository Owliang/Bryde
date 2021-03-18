var mongo = require('mongodb');
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
const { body, validationResult, check } = require('express-validator');
const { UnavailableForLegalReasons } = require('http-errors');
var fs = require('fs');
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
    res.render('upload');
    //res.json({result:'Response from create course page'})
});
course_upload = upload.fields([{name:'attach_photo',maxcount:1},{name:'attach_video',maxcount:15}]);
router.post('/',course_upload,function(req, res, next) {
        MongoClient.connect(url, function(err, db) {
            if (err) {
              res.json({result:false,error:err})
            }
            else{
                var dbo = db.db("BrydeTech");
                var video = [];
                for(i=0;i<(req.files['attach_video']).length;i++){
                    video.push(fs.readFileSync('uploads/'+req.files['attach_video'][i].originalname));
                }
                var myobj = {name:req.body.name,
                    tutor:req.body.tutor,
                    price:req.body.price,
                    subject:req.body.subject,
                    description:req.body.description,
                    link:req.body.link,
                  photo_buffer:fs.readFileSync('uploads/'+req.files['attach_photo'][0].originalname),
                  video_buffer:video,
                    rating:7,
                    enrolled_date:'-',
                    student:[]};
                dbo.collection("courses").insertOne(myobj,function(err,response){
                    if (err) throw err;
                    db.close();
                });
                res.json({result:true,error:""})
            }
        });
});

module.exports = router;
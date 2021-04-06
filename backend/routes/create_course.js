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
            console.log('multer')
            cb(null, file.originalname)
        }
    })
})
/* GET home page. */

router.get('/', function(req, res, next) {
    //res.render('upload');
    res.json({result:'Response from create course page'})
});

router.post('/',function(req, res, next) {
        console.log('recieve data')
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            console.log(fields)
            console.log(files)
            console.log(files['attatch_photo'])
            MongoClient.connect(url, function(err, db) {
                if (err) {
                res.json({result:false,error:err})
                }
                else{
                    var dbo = db.db("BrydeTech");
                    var myobj = {name:fields.name,
                        tutor:fields.tutor,
                        price:parseInt(fields.price),
                        subject:fields.subject,
                        description:fields.description,
                        link:fields.link,
                        photo_buffer:fs.readFileSync(files.attatch_photo.path),
                        video_name:[],
                        video_buffer:[],
                        video_size:[],
                        video_type:[],
                        rating:7,
                        enrolled_date:'-',
                        student:[]};
                    dbo.collection("courses").insertOne(myobj,function(err,result){
                        if (err) {
                            res.json({result:false , error:err})
                        }
                        else{
                            res.json({result:true,error:"",id:result["ops"][0]["_id"]})
                        }
                        db.close();
                    });
                    
                }
            });
        });
});

module.exports = router;
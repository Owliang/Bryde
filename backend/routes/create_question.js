var mongo = require('mongodb');
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
const { body, validationResult, check } = require('express-validator');
const { UnavailableForLegalReasons } = require('http-errors');
var formidable = require('formidable')
var fs = require('fs');
var multer = require('multer')
var upload = multer({
    storage: multer.diskStorage({
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
router.get('/', function (req, res, next) {
    res.render('create_question')
    //res.json({ result : 'Response from create question page' })  
});
router.post('/', function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        const result = validationResult(fields);
        var errors = result.errors;
        if (!result.isEmpty()) {
            res.json({ result: false, error: errors })
        }
        else {
            MongoClient.connect(url, function (err, db) {
                if (err) {
                    res.json({ result: false, error: err })
                }
                else {
                    var dbo = db.db("BrydeTech");
                    var myobj = {
                        topic: fields.topic,
                        creator: fields.creator,
                        subject: fields.subject,
                        description: fields.content,
                        attach_photo: files['attatch_photo'].name,
                        buffer: fs.readFileSync(files['attatch_photo'].path),
                        comment: [], follower: [] , writer:[],
                        //follower:[],comment:[]
                    };
                    dbo.collection("Q&A").insertOne(myobj, function (err, res) {
                        if (err) res.json({ result: false, error: err });
                        db.close();
                    });
                    res.json({ result: true, error: "" })
                }
            });
        }
    });
});

module.exports = router;

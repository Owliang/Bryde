var mongo = require('mongodb');
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
const { body, validationResult, check } = require('express-validator');
const { UnavailableForLegalReasons } = require('http-errors');
var fs = require('fs');
var formidable = require('formidable')

/* GET home page. */

router.get('/', function(req, res, next) {
    res.render('upload');
    //res.json({result:'Response from create course page'})
});


//router.post('/',course_upload,function(req, res, next) {
router.post('/',function(req, res, next) {
        console.log('recieve data')
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            MongoClient.connect(url, function(err, db) {
                if (err) {
                res.json({result:false,error:err})
                }
                else{
                    var dbo = db.db("BrydeTech");
                    var video = [];
                    for(i=0;i<fields['total_video'];i++){
                        video.push(fs.readFileSync(files['attatch_video_'+i].path));
                    }
                    var id = new mongo.ObjectID(fields.id);
                    var myquery = {"_id":id}
                    var newvalues = {$set:{video_buffer:video}}
                    dbo.collection("courses").updateOne(myquery,newvalues,function(err,response){
                        if (err) {
                            res.json({result:false , error:err})
                        }
                        console.log("yeah")
                        db.close();
                    });
                    res.json({result:true,error:""})
                }
            });
        });
});

module.exports = router;
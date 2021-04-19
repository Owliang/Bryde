// var express = require('express');
// var mongo = require('mongodb');
// var router = express.Router();
// var mongoose = require('mongoose');
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://127.0.0.1:27017/";
// var Binary = require('mongodb').Binary;
// var fs = require('fs');
// /* GET home page. */

// router.get('/', function(req, res, next) {
//     MongoClient.connect(url, function(err, db) {
//         if (err) {
//             res.json({result:false,error:err})
//         }
//         else{
//             var dbo = db.db("BrydeTech");
//             dbo.collection("courses").find({student:req.query.username}).toArray(function(err, result) {
//                 if (err) {
//                     res.json({result:false , error:err})
//                 }
//                 res.json({result:result});
//                 db.close();
//             })
//         }
//     });
// });
// module.exports = router;

var express = require('express');
var mongo = require('mongodb');
var router = express.Router();
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
var Binary = require('mongodb').Binary;
var fs = require('fs');
const { body, validationResult, check } = require('express-validator');
const { UnavailableForLegalReasons } = require('http-errors');
/* GET home page. */

router.get('/', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            res.json({result:false,error:err})
        }
        else{
            var dbo = db.db("BrydeTech");
            dbo.collection("courses").find({student:req.query.username}, { projection:{_id:1,name:1,tutor:1,price:1,subject:1,description:1,link:1,photo_buffer:1,rating:1,student:1} }).toArray(function(err, result) {
                if (err) {
                    res.json({result:false , error:err})
                }
                res.json({result:result});
                db.close();
            })
        }
    });
});
router.post('/',[check("student_name","Please enter student name").not().isEmpty(),check("score","Please enter score").not().isEmpty(),
    check("id","Please enter id").not().isEmpty()], function(req, res, next) {
        MongoClient.connect(url, function(err, db) {
            if (err) {
                res.json({result:false,error:err})
            }
            var dbo = db.db("BrydeTech");
            var id = new mongo.ObjectID(req.body.id)
            var rating = parseFloat(0);
            var index = -1;
            var new_score = [];
            dbo.collection("courses").find({_id:id},{projection:{_id:1,student:1,score:1}}).toArray(function(err, result) {
                if (err) {
                    res.json({result:false , error:err})
                }
                index = result[0].student.findIndex(student => student == req.body.student_name);
                var total = parseFloat(0)
                for(i=0;i<result[0].student.length;i++){
                    if(i==index){
                        total = total + parseFloat(req.body.score);
                        new_score.push(parseFloat(req.body.score))
                    }
                    else{
                        total = total + parseFloat(result[0].score[i]);
                        new_score.push(parseFloat(result[0].score[i]))
                    }
                }
                rating = parseFloat(total/result[0].student.length)
                var dbo = db.db("BrydeTech");
                var myquery = { _id: id };
                var newvalues = { $set: {score:new_score,rating:rating} };
                dbo.collection("courses").updateOne(myquery, newvalues, function(err, result2) {
                    if (err) {
                        res.json({result:false , error:err})
                    }
                    res.json({result:true,error:"",_id:result[0]._id,new_rating:rating});
                });
                db.close();
            })
        });
});
module.exports = router;
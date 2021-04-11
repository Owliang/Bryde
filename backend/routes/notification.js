var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
const { query, validationResult, check } = require('express-validator');
const { UnavailableForLegalReasons } = require('http-errors');
/* GET home page. */
router.get('/',  function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
          res.json({result:false,error:err})
        }
        else{
            var dbo = db.db("BrydeTech");
            var status = (req.query.status == "all" ) ? /^/:req.query.status
            dbo.collection("notification").find({username:req.query.username,status:status}).toArray(function(err,result){
                if(err){
                    res.json({result:false,error:err})
                }
                res.json({result:true,error:"",data:result})
                db.close()
            })
        }
    });
});
router.post('/',[check("id","Please enter id").not().isEmpty()],function(req, res, next) {
    const result = validationResult(req);
    var errors = result.errors;
    if (!result.isEmpty()) {
        res.json({result:false,error:errors})
    }
    else{
        MongoClient.connect(url, function(err, db) {
            if (err) {
              res.json({result:false,error:err})
            }
            else{
                var dbo = db.db("BrydeTech");
                var id = new mongo.ObjectID(req.body.id)
                dbo.collection("notification").findOneAndUpdate({_id:id},{$set:{status:"read"}},function(err,result){
                    if(err){
                        res.json({result:false,error:err})
                    }
                    res.json({result:true,error:""})
                    db.close();
                })
            }
        });
    }
    
});
module.exports = router;

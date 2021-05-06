var mongo = require('mongodb');
var express = require('express');
const db = require('monk')("localhost:27017/TutorialDB");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://13.213.61.131:27017/";
var router = express.Router();
const { body, validationResult, check } = require('express-validator');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('blog');
});

router.get('/showallblog', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            throw err;
        }
        else{
            var dbo = db.db("TutorialDB");
            var sname = req.body.searchname;
            dbo.collection("blogs").find({}, { projection: { _id: 0, name: 1 ,description:1,author:1} }).toArray(function(err, result) {
                if (err) throw err
                //res.json({result:result});
                res.render('showallblog',{param:result});
                db.close();
            })
        }
    });
});

router.get('/add', function(req, res, next) {
    res.render('addblog');
});

router.get('/search', function(req, res, next) {
    res.render('searchblog');
});

router.post('/search',[check("searchname","Please enter blog name").not().isEmpty()]
,function(req, res, next) {
    const result = validationResult(req);
    var errors = result.errors;
    if (!result.isEmpty()) {
        res.render('searchblog',{errors:errors});
    }else{
        MongoClient.connect(url, function(err, db) {
            if (err) {
                res.send(err);
            }
            else{
                var dbo = db.db("TutorialDB");
                var sname = req.body.searchname;
                dbo.collection("blogs").find({name:sname}, { projection: { _id: 0, name: 1 ,description:1,author:1} }).toArray(function(err, result) {
                    if (err) throw err
                    //res.send(result)
                    console.log("ok")
                    /*for(i=0;i<result.length;i++){
                        console.log(result[i]);
                    } 
                    res.send("ok")*/
                    console.log(result)
                    res.render('showblog',{param:result});//,{name:result[0].name,desc:result[0].description,auth:result[0].author});
                    db.close();
                })
                /*dbo.collection("blogs").find({"name":sname}, { projection: { _id: 0, name: 1 ,description:1,author:1} }).toArray(function(err, result) {
                    if (err) throw err
                    res.render('showblog',{name:result[0].name,desc:result[0].description,auth:result[0].author});
                    db.close();
                });*/
            }
            /*res.location('/blog/add');
            res.redirect('/blog/add');*/
        });
    }
});

router.post('/add',[
  check("name","Please Input your name").not().isEmpty(),
  check("description","Please Input your Description").not().isEmpty(),
  check("author","Please Input your Author").not().isEmpty()
],function(req, res, next) {
    const result = validationResult(req);
    var errors = result.errors;
    if (!result.isEmpty()) {
        res.render('addblog',{errors:errors});
    }
    else{
        MongoClient.connect(url, function(err, db) {
            if (err) {
                res.send(err);
            }
            else{
                var dbo = db.db("TutorialDB");
                var myobj = {name:req.body.name,description:req.body.description,author:req.body.author};
                dbo.collection("blogs").insertOne(myobj,function(err,res){
                    if (err) throw err;
                    console.log("1 blog insert");
                    db.close();
                });
            }
            res.location('/blog/add');
            res.redirect('/blog/add');
        });
    }
});

module.exports = router;

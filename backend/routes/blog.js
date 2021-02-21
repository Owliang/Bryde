var mongo = require('mongodb');
var express = require('express');
const db = require('monk')("localhost:27017/TutorialDB");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
var router = express.Router();
const { body, validationResult, check } = require('express-validator');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('blog');
});
router.get('/add', function(req, res, next) {
    res.render('addblog');
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
      //return res.status(400).json({ errors: errors.array() });
    }
    /*else{
        var ct = db.get('blogs');
        ct.insert({
            name:req.body.name,
            description:req.body.description,
            autor:req.body.author,
        }),function(err,blog){
            if(err){
                res.send(err);
            }else{
                res.location('/blog/add');
                res.redirect('/blog/add');
            }
        }
    }*/
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

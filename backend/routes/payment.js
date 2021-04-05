var express = require('express');
var router = express.Router();
const generatePayload = require('promptpay-qr') 
const qrcode = require('qrcode') 
const fs = require('fs') 
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
const { body, validationResult, check } = require('express-validator');
const { UnavailableForLegalReasons } = require('http-errors');
/* GET home page. */
router.get('/', function(req, res, next) {
  //res.json({ result : 'Response from login page'})  
  res.render('payment_detail');
});
router.post('/',[check("tutor","Please Input tutor"),check("price","Please Input price")], function(req, res, next) {
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
          dbo.collection("users").find({"username":req.body.tutor}, { projection: { _id: 0, ppnumber:1} }).toArray(function(err, result) {
            if (err) {
              res.json({result:false , error:err})
            }
            const amount = parseFloat(req.body.price)
            const payload = generatePayload(result[0].ppnumber, { amount }) //First parameter : mobileNumber || IDCardNumber
            var name = './qr/'+req.body.tutor +'_' + result[0].ppnumber+'_'+amount+'.jpg'
            qrcode.toFile(name,payload,function(err){
              if(err) throw err;
              console.log("complete")
              img = fs.readFileSync(name)
              console.log(img)
              //res.json({result:true,error:"",qr:img})
              res.render('payment',{param:img})
            })
            db.close();
          });
          //res.json({result:true,error:""})
      }
    });
  }
});

module.exports = router;

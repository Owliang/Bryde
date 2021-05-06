var mongo = require('mongodb');
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://13.213.61.131:27017/";
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
const { body, validationResult, check } = require('express-validator');
const { UnavailableForLegalReasons } = require('http-errors');
//for send email
'use strict';
const nodemailer = require('nodemailer');
const { render } = require('ejs');
//

/* GET home page. */
router.get('/', function(req, res, next) {
    img = fs.readFileSync('uploads/IMG_0130.mov')//iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
    //res.render('register');
    res.render('register',{param:img});
    //res.json({ result : 'Response from register page' })  
});

router.post('/',upload.single('file'),/*[
        check("username","Please Input your username").not().isEmpty(),
        check("password","Please Input your password").not().isEmpty(),
        check("fname","Please Input your fname").not().isEmpty(),
        check("lname","Please Input your lname").not().isEmpty(),
        check("email","Please Input your email").not().isEmpty(),
        check("ppnumber","Please Input your Prompt Pay Number").not().isEmpty(),
        check("isTutor","Please Input your role").not().isEmpty()
    ],*/ function(req, res, next) {
        const result = validationResult(req);
        var errors = result.errors;
        if (!result.isEmpty()) {
            res.json({result:false,error:errors})
        }
        else {
            MongoClient.connect(url, function(err, db) {
                if (err) {
                    //res.send(err);
                    res.json({result:false,error:err})
                }
                else{
                    var dbo = db.db("BrydeTech");
                    dbo.collection("users").find({"username":req.body.username}, { projection: { _id: 0, username: 1} }).toArray(function(err, result) {
                        if (err) {
                            throw err;
                        }
                        if(result.length===0){
                            var myobj = { username:req.body.username,
                                password:req.body.password,
                                fname:req.body.fname,
                                lname:req.body.lname,
                                email:req.body.email,
                                ppnumber:req.body.ppnumber,
                                isTutor:req.body.isTutor,
                                file:'uploads/'+req.file.originalname,
                                buffer:fs.readFileSync('uploads/'+req.file.originalname)};
                                code = Math.floor(Math.random() * Math.floor(99999)).toString();
                                send_email(req.body.email,code);
                                res.json({ result : true ,code:code, data:myobj, error:""})
                        }
                        else{
                            res.json({result:false, error:"This username already registered"})
                        }
                        db.close();
                    });
                }
            });
        }
});

module.exports = router;
function send_email(email,code){
    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
    // สร้างออปเจ็ค transporter เพื่อกำหนดการเชื่อมต่อ SMTP และใช้ตอนส่งเมล
    let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: { // ข้อมูลการเข้าสู่ระบบ
    user: 'brydetech@gmail.com', // email user ของเรา
    pass: 'brudabruda06' // email password
    }
    });
    // เริ่มทำการส่งอีเมล
    let info = await transporter.sendMail({
    from: 'brydetech@gmail.com', // อีเมลผู้ส่ง
    to: email,//,fairphare@gmail.com,owliang1234@gmail.com', // อีเมลผู้รับ สามารถกำหนดได้มากกว่า 1 อีเมล โดยขั้นด้วย ,(Comma)
    subject: 'Hello ✔', // หัวข้ออีเมล
    text: 'ส่งmailได้เเล้วววว', // plain text body
    html: '<b>ALMOST DONE!!</b><p>To complete your registration as a OffDemand user, please use the verification code below.</p><b>VERIFICATION CODE:</b><p>'+code+'</p><p>If u dont get an email, please allow less security apps first</p><a href="https://myaccount.google.com/u/4/lesssecureapps">here</a>' // html body
    });
    // log ข้อมูลการส่งว่าส่งได้-ไม่ได้
    console.log('Message sent: %s', info.messageId);
    }
    main().catch(console.error);  
};
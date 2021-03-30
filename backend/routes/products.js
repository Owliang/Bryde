var express = require('express');
var router = express.Router();

/*var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'Bryde',
      pass:  'BrydeBryde!'
    }
  });
  
  var mailOptions = {
    from: 'Bryde@gmail.com',
    to: 'suntawan2543@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('product', { title: 'Product Page' });
});

router.get('/add', function(req, res, next) {
    res.send('Add products');
});

router.get('/edit', function(req, res, next) {
    res.send('Edit products');
});

router.get('/delete', function(req, res, next) {
    res.send('Delete products');
}); 

module.exports = router;
var express = require('express');
const cors = require("cors");
var router = express.Router();

const userStatus = {
    username : "",
    isLogin:false
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.renser('home');
});
router.post('/', function(req, res, next) {
  res.send('respond with a resource post');
});

// Get User Status
router.get('/userStatus', function(req, res, next) {
  res.renser(userStatus);
});

router.post('/userLogin', function(req, res, next) {
  if (!userStatus.isLogin){
      userStatus.username = req.body.username;
      userStatus.isLogin = true;
      res.json({ result : true , error : "Login Success" })
  }else{
      res.json({ result : false , error : "Another User Already Login" })
  }
});

router.post('/userLogout', function(req, res, next) {
  if (userStatus.isLogin && userStatus.username == req.body.username){
      userStatus.username = "";
      userStatus.isLogin = false;
      res.json({ result : true , error : "Logout Success" })
  }else if(userStatus.isLogin) {
      res.json({ result : false , error : "Wrong User Name to Logout" })
  }else{
      res.json({ result : false , error : "No User Logging In" })
  }
});

// http://localhost:4000/users/owliang
router.get('/owliang', function(req, res, next) {
  res.send('Kantapon');
});

module.exports = router;

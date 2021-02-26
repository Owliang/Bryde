var express = require('express');
const cors = require("cors");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.renser('home');
});
router.post('/', function(req, res, next) {
  res.send('respond with a resource post');
});

// http://localhost:4000/users/owliang
router.get('/owliang', function(req, res, next) {
  res.send('Kantapon');
});

module.exports = router;

var express = require('express');
const app = express();
var router = express.Router();
const cors = require("cors");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('index.js');
});

router.post('/', function(req, res, next) {
  res.send('respond with a resource from index.js!!!!');
});

/*app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Methods','POST, GET, PUT, PATCH, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers','Content-Type, Option, Authorization')
  next()
})*/

module.exports = router;

var express = require('express');
var router = express.Router();

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
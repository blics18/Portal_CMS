var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('admin');
});

router.get('/editPage', function(req, res, next) {
  res.render('editPage');
});


module.exports = router;

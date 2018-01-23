var express = require('express');
var auth = require('../utils/requireLogin');
var router = express.Router();

router.use(auth.requireLogin);

router.get('/', function(req, res, next) {
  res.render('template');
});

module.exports = router;

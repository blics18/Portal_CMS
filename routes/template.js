var express = require('express');
var router = express.Router();

router.get('/', requireLogin, function(req, res, next) {
  res.render('template');
});

module.exports = router;

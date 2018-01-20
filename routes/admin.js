var express = require('express');
var pageModel = require('../models/page');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('admin');
});

router.get('/editPage', function(req, res) {
  res.render('editPage');
});

router.post('/addPage', function(req, res) {
  	var newPage = new pageModel({
		title : req.body.title,
    section_title: req.body.section1_title,
    body: req.body.section1_body,
		url: req.body.url,
    footer: req.body.footer,
    template: req.body.template
	});

	newPage.save(function(err, user){
		if(err) return console.error(err);
		res.redirect('/admin');
	});
});

router.get('/editAccount', function(req, res){
	res.render('editAccount');
})


module.exports = router;

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
		title: String,
		url: String
});

var pageModel= mongoose.model('page', pageSchema);

router.get('/', function(req, res, next) {
  res.render('admin');
});

router.get('/editPage', function(req, res, next) {
  res.render('editPage');
});

router.get('/addPageForm', function(req, res){
	res.render('addPage');
});

router.post('/addPage', function(req, res, next) {
  	var newPage = new pageModel({
		title : req.body.title,
		url: req.body.url,
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

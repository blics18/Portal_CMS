var express = require('express');
var pageModel = require('../models/page');
var userModel = require('../models/user');
var auth = require('../utils/requireLogin');
var router = express.Router();

router.use(auth.requireLogin);

router.get('/', function(req, res) {
  pageModel.find({"user._id": req.user._id },
  function(err, page){
    if (err){
      return res.send(err);
    };
    // render the dashboard page
    res.render('admin', {
      pages: page
  });
});
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
    template: req.body.template,
    user: req.user,
    date: new Date()
	});

	newPage.save(function(err, user){
		if(err) return console.error(err);
		res.redirect('/admin');
	});
});

router.get('/editAccount', function(req, res){
	res.render('editAccount');
});

router.get('/logout', function(req, res){
  req.session.reset();
  res.redirect('/auth');
});

router.get('/deletePage/:url', function(req, res){
  pageModel.remove( {"user._id": req.user._id, url: req.params.url},
   function(err, isDeleted){
    if(err) return console.error(err);
    res.redirect('/admin');
  });
});

module.exports = router;

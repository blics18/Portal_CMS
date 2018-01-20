var express = require('express');
var userModel = require('../models/user');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('auth');
});

router.post('/register', function(req, res){
	var newUser = new userModel({
		email : req.body.email,
		password: req.body.password,
	});

	newUser.save(function(err, user){
		if(err) return console.error(err);
		res.redirect('/admin');
	});

});

router.post('/login', function(req, res){
		userModel.findOne( {email: req.body.email, password: req.body.password}, function(err, user){
			 if (err){
				 res.render('auth', {authError: 'Something wrong with database'});
				 return console.error(err);
			 }
			 if (user == null){
				 console.log(user);
		 		 res.render('auth', {authError: 'Incorrect Username or Password'});
			 }else{
				 	console.log(user);
		 			res.redirect('/admin');
			 };
	});
});

module.exports = router;

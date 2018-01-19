var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
		email: String,
		password: String
});

var userModel= mongoose.model('users', userSchema);

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
	// userModel.find({'email': req.body.email, 'password': req.body.email}, function(err, user){
		userModel.where('email').equals(req.body.email).where('password').equals(req.body.password).exec(function(err, user){
		if (err) return console.error(err);
		if (user.length == 0){
			console.log(user);
			res.redirect('back');
			// res.send("CANNOT LOGIN");
		}else{
			console.log(user);
			res.redirect('/admin');
		};
	});
});

module.exports = router;

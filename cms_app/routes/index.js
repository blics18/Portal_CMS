var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
var userSchema = mongoose.Schema({ 
		email: String,
		password: String
});

var userModel= mongoose.model('users', userSchema);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res){
		var newUser = new userModel({
			email: 'thi@thi.com', 
			password: "blah", 
		});
		newUser.save(function(err, user){
			if(err) return console.error(err);
			console.log(user);
		});
		res.end();

});

router.post('/auth/register', function(req, res){
	var newUser = new userModel({
		email : req.body.email,
		password: req.body.password,
	});
	newUser.save(function(err, user){
		if(err) return console.error(err);
		res.redirect('/admin');
	});

});

module.exports = router;

var mongoose = require('mongoose');

var schema = mongoose.Schema({
		email: String,
		password: String
});

module.exports = mongoose.model('users', schema);

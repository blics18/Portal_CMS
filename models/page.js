var mongoose = require('mongoose');

var schema = mongoose.Schema({
		title: String,
		section_title: String,
		body: String,
		url: String,
		footer: String,
		template: String
});

module.exports = mongoose.model('page', schema);

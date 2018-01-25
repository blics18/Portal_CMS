var mongoose = require('mongoose');

var schema = mongoose.Schema({
		title: {type: String, required: true},
		section_title: {type: String, required: true},
		body: {type: String, required: true},
		url: {type: String, unique: true, required: true},
		footer: {type: String, required: true},
		template: {type: String, required: true},
		user: {type: Object, required: true},
		date: {type: Date, required: true},
		visible: {type: Boolean, required: true}
});

module.exports = mongoose.model('page', schema);

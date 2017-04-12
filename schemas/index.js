const mongoose = require('mongoose');

mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/notesql");

module.exports = {
	note: require('./note.js')
};
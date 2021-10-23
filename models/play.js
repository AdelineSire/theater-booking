const mongoose = require('mongoose');

const playSchema = new mongoose.Schema({
	title: String,
	created: Date,
});

const Play = mongoose.model('Play', playSchema);
module.exports = Play;

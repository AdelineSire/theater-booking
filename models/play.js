const mongoose = require('mongoose');

const playSchema = new mongoose.Schema({
	title: String,
});

const Play = mongoose.model('Play', playSchema);
module.exports = Play;

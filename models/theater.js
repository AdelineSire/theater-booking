const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
	name: String,
	created: Date,
	address: String,
	row: Number,
	col: Number,
});

const Theater = mongoose.model('Theater', theaterSchema);
module.exports = Theater;

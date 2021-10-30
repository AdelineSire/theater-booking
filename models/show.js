const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
	play: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Play',
	},
	theater: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Theater',
	},
	date: String,
	price1: Number,
	price2: Number,
	seats: [],
});

const Show = mongoose.model('Show', showSchema);
module.exports = Show;

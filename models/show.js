const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
	play: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Play',
	},
});

const Show = mongoose.model('Show', showSchema);
module.exports = Show;

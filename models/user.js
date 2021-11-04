const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	firstname: String,
	lastname: String,
	email: String,
	tel: String,
	address: String,
	roles: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Role',
	},
	password: String,
});

const User = mongoose.model('User', userSchema);
module.exports = User;

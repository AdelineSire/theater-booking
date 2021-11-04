const express = require('express');
const router = express.Router();

const { User, Role } = require('../models');

const createUser = (req, res) => {
	// console.log('req.body: ', req.body);
	const newUser = req.body;
	const date = Date.now();
	const user = new User({
		firstname: newUser.firstname,
		lastname: newUser.lastname,
		email: newUser.email,
		tel: newUser.tel,
		address: newUser.address,
	});

	Role.findOne({ name: newUser.role })
		.then((role) => {
			// console.log('role: ', role);
			user.role = role;
			// console.log('user: ', user);
			user.save(user);
		})
		.then((user) => res.json(user))
		.catch((err) => {
			res.json(err);
		});
};

const readUsers = (req, res) => {
	User.find({})
		.populate('role')
		.then((users) => {
			console.log('users in readUsers: ', users);
			const usersSorted = users.sort((a, b) => (a > b ? -1 : +1));
			res.json(usersSorted);
		})
		.catch((err) => {
			res.json(err);
		});
};

const updateUser = (req, res) => {
	console.log('req.body in updateUser', req.body);
	const userId = req.params.id;
	const newValue = req.body.newValue;

	User.updateOne({ _id: userId, $set: newValue })
		.then((updatedUser) => {
			res.json(updatedUser);
		})
		.catch((err) => console.log(err));
};

router.route('/').post(createUser);
router.route('/').get(readUsers);
router.route('/:id').put(updateUser);
module.exports = router;

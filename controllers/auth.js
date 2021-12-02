var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const config = require('../config/auth.config');
const { User, Role } = require('../models');

exports.signup = (req, res) => {
	const user = new User({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		tel: req.body.tel,
		password: bcrypt.hashSync(req.body.password, 8),
	});

	user.save((err, user) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}

		if (req.body.role) {
			Role.find(
				{
					name: req.body.role,
				},
				(err, role) => {
					if (err) {
						res.status(500).send({ message: err });
						return;
					}

					user.role = role._id;
					console.log('user.roles in signup: ', user.role);
					user.save((err) => {
						if (err) {
							res.status(500).send({ message: err });
							return;
						}

						res.send({ message: 'User was registered successfully!' });
					});
				}
			);
		} else {
			Role.findOne({ name: 'spectator' }, (err, role) => {
				if (err) {
					res.status(500).send({ message: err });
					return;
				}

				user.role = role._id;
				console.log('user.roles 2 in signup: ', user.role);
				user.save((err) => {
					if (err) {
						res.status(500).send({ message: err });
						return;
					}

					res.send({ message: 'User was registered successfully!' });
				});
			});
		}
	});
};

exports.signin = (req, res) => {
	console.log('req.body in signin: ', req.body);
	User.findOne({
		email: req.body.email,
	})
		.populate('role', '-__v')
		.exec((err, user) => {
			console.log('user in signin controller: ', user);
			if (err) {
				res.status(500).send({ message: err });
				return;
			}

			if (!user) {
				return res.status(404).send({ message: 'User Not found.' });
			}

			const passwordIsValid = bcrypt.compareSync(
				req.body.password,
				user.password
			);

			if (!passwordIsValid) {
				return res.status(401).send({
					accessToken: null,
					message: 'Invalid Password!',
				});
			}

			const token = jwt.sign({ id: user.id }, config.secret, {
				expiresIn: 86400, // 24 hours
			});

			res.status(200).send({
				_id: user._id,
				firstname: user.firstname,
				lastname: user.lastname,
				email: user.email,
				role: user.role.name,
				accessToken: token,
			});
		});
};

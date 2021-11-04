const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const ROLES = ['spectator', 'seller', 'host', 'admin'];
const { User, Role } = require('../models');

verifyToken = (req, res, next) => {
	let token = req.headers['x-access-token'];

	if (!token) {
		return res.status(403).send({ message: 'No token provided!' });
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			return res.status(401).send({ message: 'Unauthorized!' });
		}
		req.userId = decoded.id;
		next();
	});
};

isSpectator = (req, res, next) => {
	User.findById(req.userId).exec((err, user) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}

		Role.find(
			{
				_id: { $in: user.roles },
			},
			(err, roles) => {
				if (err) {
					res.status(500).send({ message: err });
					return;
				}

				for (let i = 0; i < roles.length; i++) {
					if (roles[i].name === 'spectator') {
						next();
						return;
					}
				}

				res.status(403).send({ message: 'Require Spectator Role!' });
				return;
			}
		);
	});
};

isSeller = (req, res, next) => {
	User.findById(req.userId).exec((err, user) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}

		Role.find(
			{
				_id: { $in: user.roles },
			},
			(err, roles) => {
				if (err) {
					res.status(500).send({ message: err });
					return;
				}

				for (let i = 0; i < roles.length; i++) {
					if (roles[i].name === 'seller') {
						next();
						return;
					}
				}

				res.status(403).send({ message: 'Require Seller Role!' });
				return;
			}
		);
	});
};

isHost = (req, res, next) => {
	User.findById(req.userId).exec((err, user) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}

		Role.find(
			{
				_id: { $in: user.roles },
			},
			(err, roles) => {
				if (err) {
					res.status(500).send({ message: err });
					return;
				}

				for (let i = 0; i < roles.length; i++) {
					if (roles[i].name === 'host') {
						next();
						return;
					}
				}

				res.status(403).send({ message: 'Require Host Role!' });
				return;
			}
		);
	});
};

isAdmin = (req, res, next) => {
	User.findById(req.userId).exec((err, user) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}

		Role.find(
			{
				_id: { $in: user.roles },
			},
			(err, roles) => {
				if (err) {
					res.status(500).send({ message: err });
					return;
				}

				for (let i = 0; i < roles.length; i++) {
					if (roles[i].name === 'admin') {
						next();
						return;
					}
				}

				res.status(403).send({ message: 'Require Admin Role!' });
				return;
			}
		);
	});
};

const authJwt = {
	verifyToken,
	isSpectator,
	isSeller,
	isHost,
	isAdmin,
};
module.exports = authJwt;

const express = require('express');
const cors = require('cors');

// App
const app = express();
app.use(express.static('public'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Models
const { Role } = require('./models');

// BD connection
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const dbConfig = require('./config/db.config.js');
const MONGODB_URI =
	process.env.MONGODB_URI ||
	`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`;

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log('Successfully connected to MongoDB.');
		initial();
	})
	.catch((err) => {
		console.error('Connection error', err);
		process.exit();
	});

// Creates roles (spectator, seller, host, admin) in DB
const initial = () => {
	Role.estimatedDocumentCount((err, count) => {
		if (!err && count === 0) {
			new Role({
				name: 'spectator',
			}).save((err) => {
				if (err) {
					console.log('error', err);
				}
				console.log("added 'spectator' to roles collection");
			});

			new Role({
				name: 'seller',
			}).save((err) => {
				if (err) {
					console.log('error', err);
				}
				console.log("added 'seller' to roles collection");
			});

			new Role({
				name: 'host',
			}).save((err) => {
				if (err) {
					console.log('error', err);
				}
				console.log("added 'host' to roles collection");
			});

			new Role({
				name: 'admin',
			}).save((err) => {
				if (err) {
					console.log('error', err);
				}
				console.log("added 'admin' to roles collection");
			});
		}
	});
};

// Middlewares
const { verifySignUp, authJwt } = require('./middlewares');

// Controllers
const { play, theater, show, user, auth } = require('./controllers');

// Routes
app.use(function (req, res, next) {
	res.header(
		'Access-Control-Allow-Headers',
		'x-access-token, Origin, Content-Type, Accept'
	);
	next();
});

app.post(
	'/signup',
	[verifySignUp.checkDuplicateEmail, verifySignUp.checkRolesExisted],
	auth.signup
);

app.post('/signin', auth.signin);

app.use('/play', play);
app.use('/theater', theater);
app.use('/show', show);
app.use('/user', user);

// set port, listen for requests
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});

const express = require('express');
const router = express.Router();

const { Play } = require('../models');

const createPlay = (req, res) => {
	console.log('req.body: ', req.body);
	const newPlay = req.body;
	const date = Date.now();
	console.log('date: ', date);
	const play = new Play({
		title: newPlay.title,
		created: date,
	});

	play
		.save(play)
		.then((play) => res.json(play))
		.catch((err) => {
			res.json(err);
		});
};

const readPlays = (req, res) => {
	Play.find({})
		.then((plays) => {
			const playsSorted = plays.sort((a, b) => (a.date > b.date ? 1 : -1));
			res.json(playsSorted);
		})
		.catch((err) => {
			res.json(err);
		});
};

router.route('/').post(createPlay);
router.route('/').get(readPlays);
module.exports = router;

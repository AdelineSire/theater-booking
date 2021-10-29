const express = require('express');
const router = express.Router();

const { Show } = require('../models');

const createShow = (req, res) => {
	console.log('req.body: ', req.body);
	const newShow = req.body;
	const show = new Show({
		play: newShow.play,
		theater: newShow.theater,
		date: newShow.date,
		price1: newShow.price1,
		price2: newShow.price2,
	});

	show
		.save(show)
		.then((show) => res.json(show))
		.catch((err) => {
			res.json(err);
		});
};

const readShows = (req, res) => {
	Show.find({})
		.then((shows) => {
			console.log('shows in readShows', shows);
			const showsSorted = shows.sort((a, b) => (a.date > b.date ? 1 : -1));
			res.json(showsSorted);
		})
		.catch((err) => {
			res.json(err);
		});
};

router.route('/').post(createShow);
router.route('/').get(readShows);
module.exports = router;

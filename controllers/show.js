const express = require('express');
const router = express.Router();

const { Show } = require('../models');

const createShow = (req, res) => {
	console.log('req.body: ', req.body);
	const newShow = req.body;

	const show = new Show({
		play: newShow.play,
	});

	show
		.save(show)
		.then((show) => res.json(show))
		.catch((err) => {
			res.json(err);
		});
};

router.route('/').post(createShow);
module.exports = router;

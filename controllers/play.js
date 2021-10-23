const express = require('express');
const router = express.Router();

const { Play } = require('../models');

const createPlay = (req, res) => {
	console.log('req.body: ', req.body);
	const newPlay = req.body;
	const play = new Play({
		title: newPlay.title,
	});

	play
		.save(play)
		.then((play) => res.json(play))
		.catch((err) => {
			res.json(err);
		});
};

router.route('/').post(createPlay);
module.exports = router;

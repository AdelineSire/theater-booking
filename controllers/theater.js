const express = require('express');
const router = express.Router();

const { Theater } = require('../models');

const createTheater = (req, res) => {
	console.log('req.body: ', req.body);
	const newTheater = req.body;
	const date = Date.now();
	console.log('date: ', date);
	const theater = new Theater({
		name: newTheater.name,
		created: date,
		address: newTheater.address,
		row: newTheater.row,
		col: newTheater.col,
	});

	theater
		.save(theater)
		.then((theater) => res.json(theater))
		.catch((err) => {
			res.json(err);
		});
};

const readTheaters = (req, res) => {
	Theater.find({})
		.then((theaters) => {
			const theatersSorted = theaters.sort((a, b) => {
				a.created > b.created ? 1 : -1;
			});
			res.json(theatersSorted);
		})
		.catch((err) => {
			res.json(err);
		});
};

router.route('/').post(createTheater);
router.route('/').get(readTheaters);
module.exports = router;

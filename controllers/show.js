const express = require('express');
const router = express.Router();

const { Show, Theater } = require('../models');

const createSeats = (row, col) => {
	let seats = [];
	for (let ir = row; ir > 0; ir--) {
		const chunck = [];
		for (let ic = 65; ic <= col + 65; ic++) {
			let letter = String.fromCharCode(ic);
			chunck.push({ id: `${ir}${letter}`, isBooked: false });
		}
		seats.push(chunck);
	}
	// console.log('seats: ', seats);
	return seats;
};

const createShow = async (req, res) => {
	// console.log('req.body: ', req.body);
	const newShow = req.body;
	const seats = await Theater.findOne({ id: newShow.theater }).then(
		(theater) => {
			return createSeats(theater.row, theater.col);
		}
	);
	console.log('seats: ', seats);
	const show = new Show({
		play: newShow.play,
		theater: newShow.theater,
		seats: seats,
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

const transformDate = (date) => {
	const year = date.slice(0, 4);
	const month = date.slice(5, 7);
	const day = date.slice(8, 10);
	const time = date.slice(11, 16);
	const formatedDate = `${day}-${month}-${year}`;
	return { date: formatedDate, time: time };
};

const readShows = (req, res) => {
	Show.find({})
		.populate(['play', 'theater'])
		.then((shows) => {
			const result = shows.map((show) => {
				const date = transformDate(show.date);
				const formatedShow = {
					_id: show._id,
					price1: show.price1,
					price2: show.price2,
					play: show.play.title,
					theater: {
						name: show.theater.name,
						address: show.theater.address,
					},
					seats: show.seats,
					date: date,
				};
				return formatedShow;
			});
			res.json(result);
		})
		.catch((err) => {
			res.json(err);
		});
};

const readShow = (req, res) => {
	const id = req.params.id;
	console.log('req.params.id in readShow : ', id);
	Show.findOne({ _id: id })
		.populate(['play', 'theater'])
		.then((show) => {
			const date = transformDate(show.date);
			const formatedShow = {
				_id: show._id,
				price1: show.price1,
				price2: show.price2,
				play: show.play.title,
				theater: {
					name: show.theater.name,
					address: show.theater.address,
				},
				seats: show.seats,
				date: date,
			};
			console.log('formatedShow', formatedShow);
			res.json(formatedShow);
		})
		.catch((err) => {
			res.json(err);
		});
};

router.route('/').post(createShow);
router.route('/').get(readShows);
router.route('/:id').get(readShow);
module.exports = router;

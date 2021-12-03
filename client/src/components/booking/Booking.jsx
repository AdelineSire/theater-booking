import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Seats from '../shows/Seats';

import { getShow } from '../../services/api';

const Booking = () => {
	const [show, setShow] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const { showId } = useParams();

	useEffect(() => {
		getShow(showId).then((show) => {
			console.log('show in booking', show);
			setShow(show);
			setIsLoading(false);
		});
	}, [showId]);

	return (
		<div>
			{isLoading ? (
				<p>Chargement</p>
			) : (
				<div>
					<div className='row'>
						<div>{show.date.date}</div>
						<div>{show.date.time}</div>
						<div>{show.theater.name}</div>
						<div>{show.theater.address}</div>
					</div>
					<Seats show={show} />
				</div>
			)}
		</div>
	);
};

export default Booking;

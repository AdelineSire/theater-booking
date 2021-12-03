import { useState, useEffect } from 'react';
import ShowsList from '../shows/ShowsList';

import { getShows } from '../../services/api';

import './Home.scss';

const Home = () => {
	const [shows, setShows] = useState();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getShows().then((response) => {
			setShows(response);
			setIsLoading(false);
		});
	}, []);
	return (
		<div className='home'>
			{isLoading ? (
				<p>Chargement</p>
			) : (
				<>
					<p>Sélectionner une représentation pour réserver</p>
					<ShowsList shows={shows} />
				</>
			)}
		</div>
	);
};

export default Home;

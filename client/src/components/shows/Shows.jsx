import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import LaunchIcon from '@material-ui/icons/Launch';

import { createShow, getShows } from '../../services/api';

import PlayInput from './PlayInput';
import TheaterInput from './TheaterInput';

import './Shows.scss';

const Shows = () => {
	const { register, handleSubmit, reset } = useForm({
		defaultValues: {
			play: '',
			theater: '',
			date: '',
			hosts: [],
			price1: '',
			price2: '',
		},
	});
	const [shows, setShows] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getShows().then((response) => {
			console.log('response', response);
			setShows(response);
			setIsLoading(false);
		});
	}, [isLoading]);

	const onSubmitShow = (data) => {
		createShow(data);
		reset();
		setIsLoading(true);
	};

	return (
		<div className='shows'>
			<div className='section section1'>
				<h3>Ajouter une représentation</h3>
				<div className='show-form'>
					<PlayInput register={register} />
					<TheaterInput register={register} />
					<form onSubmit={handleSubmit(onSubmitShow)}>
						<div className='form-group'>
							<label htmlFor='date'>Date</label>
							<input type='datetime-local' name='date' {...register('date')} />
						</div>
						<div className='form-group'>
							<label htmlFor='price1'>Tarif</label>
							<div className='input-group'>
								<input
									type='number'
									min='0.00'
									max='100.00'
									step='0.01'
									name='price1'
									{...register('price1')}
								/>
								<span>€</span>
							</div>
						</div>
						<div className='form-group'>
							<label htmlFor='price2'>Tarif réduit</label>
							<div className='input-group'>
								<input
									type='number'
									min='0.00'
									max='100.00'
									step='0.01'
									name='price1'
									{...register('price2')}
								/>
								<span>€</span>
							</div>
						</div>
						<button type='sumbit'>Enregistrer</button>
					</form>
				</div>
			</div>
			{isLoading ? (
				<p>Chargement</p>
			) : (
				<div className='section section2'>
					<h3>Prochaines représentations</h3>
					{shows.length === 0 ? (
						<p>Aucune représentation</p>
					) : (
						<div className='shows-list'>
							<table>
								<thead>
									<tr>
										<th>Date</th>
										<th>Heure</th>
										<th>Pièce</th>
										<th>Salle</th>
										<th>Tarif N</th>
										<th>Tarif R</th>
										<th>Nb places</th>
									</tr>
								</thead>
								<tbody>
									{shows.map((show) => (
										<tr key={show._id}>
											<td>{show.date.date}</td>
											<td>{show.date.time}</td>
											<td>{show.play}</td>
											<td>{show.theater.name}</td>
											<td>{show.price1}</td>
											<td>{show.price2}</td>
											<td>{show.sits.length}</td>
											<td>
												<LaunchIcon />
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Shows;

import { useState, useEffect } from 'react';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import useToggle from '../../hooks/useToggle';
import TheaterForm from './TheaterForm';
import { getTheaters } from '../../services/api';

import './TheaterInput.scss';

const TheaterInput = ({ register }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [theaters, setTheaters] = useState([]);
	const [theaterFormHidden, toggleTheaterFormHidden] = useToggle(true);

	useEffect(() => {
		getTheaters().then((response) => {
			setTheaters(response);
		});
	}, []);

	useEffect(() => {
		getTheaters().then((response) => {
			setTheaters(response);
			setIsLoading(false);
		});
	}, [isLoading]);

	return (
		<div>
			<div>
				{isLoading ? (
					<p>Chargement</p>
				) : (
					<div className='form-input'>
						<div className='form-group'>
							<label htmlFor='theater'>Salle</label>
							<select name='theater' {...register('theater')}>
								<option value=''>Choisir</option>
								{theaters.map((theater) => (
									<option key={theater._id} value={theater._id}>
										{theater.name}
									</option>
								))}
							</select>
						</div>
						<div
							className='icon-button'
							onClick={() => {
								toggleTheaterFormHidden();
							}}
						>
							{theaterFormHidden ? <AddIcon /> : <RemoveIcon />}
						</div>
					</div>
				)}
			</div>
			<div>
				{theaterFormHidden ? null : (
					<TheaterForm
						hide={() => toggleTheaterFormHidden()}
						reload={() => setIsLoading(true)}
					/>
				)}
			</div>
		</div>
	);
};

export default TheaterInput;

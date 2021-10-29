import { useState, useEffect } from 'react';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import useToggle from '../../hooks/useToggle';
import PlayForm from './PlayForm';
import { getPlays } from '../../services/api';

import './PlayInput.scss';

const PlayInput = ({ register }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [plays, setPlays] = useState([]);
	const [playFormHidden, togglePlayFormHidden] = useToggle(true);

	useEffect(() => {
		getPlays().then((response) => {
			setPlays(response);
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
							<label htmlFor='play'>Pièce</label>
							<select name='play' {...register('play')}>
								<option value=''>Choisir</option>
								{plays.map((play) => (
									<option key={play._id} value={play._id}>
										{play.title}
									</option>
								))}
							</select>
						</div>
						<div
							className='icon-button'
							onClick={() => {
								togglePlayFormHidden();
							}}
						>
							{playFormHidden ? <AddIcon /> : <RemoveIcon />}
						</div>
					</div>
				)}
			</div>
			<div className='sub-form'>
				{playFormHidden ? null : (
					<PlayForm
						hide={() => togglePlayFormHidden()}
						reload={() => setIsLoading(true)}
					/>
				)}
			</div>
		</div>
	);
};

export default PlayInput;

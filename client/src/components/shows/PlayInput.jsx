import { useState, useEffect } from 'react';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import useToggle from '../../hooks/useToggle';
import PlayForm from './PlayForm';
import { getPlays } from '../../services/api';

import './PlayInput.scss';

const PlayInput = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [plays, setPlays] = useState([]);
	const [playFormHidden, togglePlayFormHidden] = useToggle(true);

	useEffect(() => {
		getPlays().then((response) => {
			setPlays(response);
			setIsLoading(false);
		});
	}, []);

	useEffect(() => {
		getPlays().then((response) => {
			setPlays(response);
			setIsLoading(false);
		});
	}, [isLoading]);

	return (
		<div>
			{isLoading ? (
				<p>Chargement</p>
			) : (
				<div className='play-input'>
					<div className='form-group'>
						<label htmlFor='play'>Pièce</label>
						<select>
							{plays.map((play) => (
								<option key={play._id}>{play.title}</option>
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
			{playFormHidden ? null : (
				<PlayForm
					hide={() => togglePlayFormHidden()}
					reload={() => setIsLoading(true)}
				/>
			)}
		</div>
	);
};

export default PlayInput;

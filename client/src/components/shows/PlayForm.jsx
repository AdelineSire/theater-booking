import { useForm } from 'react-hook-form';

import { createPlay } from '../../services/api';
import './PlayForm.scss';

const PlayForm = () => {
	const { register, handleSubmit, reset } = useForm({
		defaultValues: { title: '' },
	});

	const onSubmitPlay = (data) => {
		console.log('data in onSubmitPlay', data);
		createPlay(data);
		reset();
	};

	return (
		<form className='play-form' onSubmit={handleSubmit(onSubmitPlay)}>
			<div className='form-group'>
				<label htmlFor='title'>Titre</label>
				<input name='title' {...register('title')} />
			</div>
			<button type='sumbit'>Enregistrer</button>
		</form>
	);
};

export default PlayForm;

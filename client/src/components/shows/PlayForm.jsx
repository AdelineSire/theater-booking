import { useForm } from 'react-hook-form';

import { createPlay } from '../../services/api';
import './PlayForm.scss';

const PlayForm = ({ hide, reload }) => {
	const { register, handleSubmit, reset } = useForm({
		defaultValues: { title: '' },
	});

	const onSubmitPlay = (data) => {
		console.log('data in onSubmitPlay', data);
		createPlay(data);
		reload();
		hide();
		reset();
	};

	return (
		<form className='row' onSubmit={handleSubmit(onSubmitPlay)}>
			<div className='form-group'>
				<label htmlFor='title'>Titre</label>
				<input name='title' {...register('title')} />
			</div>
			<button type='sumbit'>Enregistrer</button>
		</form>
	);
};

export default PlayForm;

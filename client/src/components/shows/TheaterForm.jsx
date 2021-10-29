import { useForm } from 'react-hook-form';

import { createTheater } from '../../services/api';
import './TheaterForm.scss';

const TheaterForm = ({ hide, reload }) => {
	const { register, handleSubmit, reset } = useForm({
		defaultValues: { title: '' },
	});

	const onSubmitTheater = (data) => {
		console.log('data in onSubmitTheater', data);
		createTheater(data);
		reload();
		hide();
		reset();
	};

	return (
		<form className='row' onSubmit={handleSubmit(onSubmitTheater)}>
			<div className='form-group'>
				<label htmlFor='name'>Nom</label>
				<input name='name' {...register('name')} />
			</div>
			<div className='form-group'>
				<label htmlFor='address'>Adresse</label>
				<input name='address' {...register('address')} />
			</div>
			<div className='form-group'>
				<label htmlFor='row'>Rangées</label>
				<input
					type='number'
					min='1'
					max='100.00'
					step='1'
					name='row'
					{...register('row')}
				/>
			</div>
			<div className='form-group'>
				<label htmlFor='col'>Sièges par rangée</label>
				<input
					type='number'
					min='1'
					max='100.00'
					step='1'
					name='col'
					{...register('col')}
				/>
			</div>
			<button type='sumbit'>Enregistrer</button>
		</form>
	);
};

export default TheaterForm;

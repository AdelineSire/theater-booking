import { useForm } from 'react-hook-form';

import { createUser } from '../../services/api';

const UserForm = () => {
	const { register, handleSubmit, reset } = useForm();

	const onSubmitUser = (data) => {
		console.log('data in onSubmitUser', data);
		createUser(data);
		reset();
	};

	return (
		<div>
			<form className='row' onSubmit={handleSubmit(onSubmitUser)}>
				<div className='form-group'>
					<label htmlFor='lastname'>Nom</label>
					<input type='text' name='lastname' {...register('lastname')} />
				</div>
				<div className='form-group'>
					<label htmlFor='firstname'>Prénom</label>
					<input type='text' name='firstname' {...register('firstname')} />
				</div>
				<div className='form-group'>
					<label htmlFor='email'>Email</label>
					<input type='email' name='email' {...register('email')} />
				</div>
				<div className='form-group'>
					<label htmlFor='tel'>Téléphone</label>
					<input type='tel' name='tel' {...register('tel')} />
				</div>
				<div className='form-group'>
					<label htmlFor='address'>Adresse</label>
					<input type='text' name='address' {...register('address')} />
				</div>
				<div className='form-group'>
					<label htmlFor='role'>Rôle</label>
					<select name='role' {...register('role')}>
						<option value=''>Choisir</option>
						<option value='spectator'>Spectateur</option>
						<option value='seller'>Vendeur</option>
						<option value='host'>Hôte</option>
						<option value='admin'>Admin</option>
					</select>
				</div>
				<button type='sumbit'>Enregistrer</button>
			</form>
		</div>
	);
};

export default UserForm;

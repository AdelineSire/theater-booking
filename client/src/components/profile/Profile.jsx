import { useState } from 'react';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { updateUser } from '../../services/api';

const userSchema = yup.object().shape({
	firstname: yup.string().required(),
	lastname: yup.string().required(),
	email: yup.string().email().required(),
	tel: yup.string(),
});

const Profile = ({ user, onLogout }) => {
	const history = useHistory();
	const [readOnly, setReadOnly] = useState(true);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		resolver: yupResolver(userSchema),
		defaultValues: {
			firstname: user.firstname,
			lastname: user.lastname,
			email: user.email,
			tel: user.tel,
		},
	});

	const onSubmitUser = (data) => {
		const id = user._id;
		updateUser(id, data);
		onLogout();
		history.push('/');
	};

	return (
		<div>
			<h3>Mes informations</h3>
			<form onSubmit={handleSubmit(onSubmitUser)}>
				<div className='form-group'>
					<label htmlFor='firstname'>Prénom</label>
					<input
						type='text'
						name='firstname'
						readOnly={readOnly}
						{...register('firstname')}
					/>
					{errors.firstname && (
						<p className='invalid-feedback'>Veuillez entrer votre prénom</p>
					)}
				</div>

				<div className='form-group'>
					<label htmlFor='lastname'>Nom</label>
					<input
						type='text'
						name='lastname'
						readOnly={readOnly}
						{...register('lastname')}
					/>
					{errors.lastname && (
						<p className='invalid-feedback'>Veuillez entrer votre nom</p>
					)}
				</div>

				<div className='form-group'>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						name='email'
						readOnly={readOnly}
						{...register('email')}
					/>
					{errors.email && (
						<p className='invalid-feedback'>
							Veuillez entrer une adresse email valide
						</p>
					)}
				</div>

				<div className='form-group'>
					<label htmlFor='tel'>Téléphone</label>
					<input
						type='text'
						name='tel'
						readOnly={readOnly}
						{...register('tel')}
					/>
				</div>
				{!readOnly && <button type='submit'>Enregistrer</button>}
			</form>
			<button onClick={() => setReadOnly(false)}>
				Modifier mes informations
			</button>
			{/* <button onClick={console.log('changer le mot de passe')}>
				Changer mon mot de passe
			</button> */}
		</div>
	);
};

export default Profile;

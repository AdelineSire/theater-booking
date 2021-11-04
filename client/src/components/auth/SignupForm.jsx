import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Email, LockOpen } from '@material-ui/icons';

import { signup } from '../../services/auth-service';
// import './auth.css';

const signupSchema = yup.object().shape({
	firstname: yup.string().required(),
	lastname: yup.string().required(),
	email: yup.string().email().required(),
	tel: yup.string(),
	password: yup.string().min(8).max(16).required(),
});

const SignUpForm = () => {
	const history = useHistory();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		resolver: yupResolver(signupSchema),
	});

	const onSubmitSignUp = (data) => {
		console.log('data in onsubmit', data);
		signup(data);
		history.push('/login');
	};

	return (
		<div className='auth-card'>
			<h1>Créer un compte</h1>

			<form className='auth-form' onSubmit={handleSubmit(onSubmitSignUp)}>
				<div className='form-group'>
					<label htmlFor='firstname'>Prénom</label>
					<div className='input-group'>
						<input name='firstname' {...register('firstname')} />
					</div>
					{errors.firstName && (
						<p className='invalid-feedback'>Veuillez entrer votre prénom</p>
					)}
				</div>

				<div className='form-group'>
					<label htmlFor='lastname'>Nom</label>
					<div className='input-group'>
						<input name='lastname' {...register('lastname')} />
					</div>
					{errors.lastName && (
						<p className='invalid-feedback'>Veuillez entrer votre nom</p>
					)}
				</div>

				<div className='form-group'>
					<label htmlFor='email'>Email</label>
					<div className='input-group'>
						<span>
							<Email />
						</span>
						<input name='email' {...register('email')} />
					</div>
					{errors.email && (
						<p className='invalid-feedback'>
							Veuillez entrer une adresse email valide
						</p>
					)}
				</div>

				<div className='form-group'>
					<label htmlFor='tel'>Téléphone</label>
					<div className='input-group'>
						<input name='tel' {...register('tel')} />
					</div>
				</div>

				<div className='form-group'>
					<label htmlFor='paswword'>Mot de passe</label>
					<div className='input-group'>
						<span>
							<LockOpen />
						</span>
						<input name='password' {...register('password')} />
					</div>
					{errors.passwword && (
						<p className='invalid-feedback'>
							Le mot de passe doit contenir entre 8 et 16 caractères
						</p>
					)}
				</div>

				<button type='submit'>Valider</button>
			</form>
		</div>
	);
};

export default SignUpForm;

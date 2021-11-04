import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Email, LockOpen } from '@material-ui/icons';

import { login } from '../../services/auth-service';
// import './auth.css';

const loginSchema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().min(8).max(16).required(),
});

const LoginForm = () => {
	const history = useHistory();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		resolver: yupResolver(loginSchema),
	});

	const onSubmit = (data) => {
		login(data);
		history.push('/');
	};

	return (
		<div className='auth-card'>
			<h1>Se connecter</h1>

			<form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
				<div className='form-group'>
					<label htmlFor='email'>Email</label>
					<div className='input-group'>
						<span>
							<Email />
						</span>
						<input name='email' {...register('email')} />
					</div>
					{errors.userName && (
						<p className='invalid-feedback'>
							Veuillez entrer une adresse email valide
						</p>
					)}
				</div>

				<div className='form-group'>
					<label htmlFor='paswword'>Mot de passe</label>
					<div className='input-group'>
						<span>
							<LockOpen />
						</span>
						<input name='password' {...register('password')} />
					</div>
					{errors.userName && (
						<p className='invalid-feedback'>
							Le mot de passe doit contenir entre 8 et 16 caractères
						</p>
					)}
				</div>
				<button type='sumbit'>Valider</button>
			</form>
		</div>
	);
};

export default LoginForm;

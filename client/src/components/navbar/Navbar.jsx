import { NavLink } from 'react-router-dom';

import './Navbar.scss';

const Navbar = ({ user, onLogout }) => {
	console.log('user in navbar', user);

	return (
		<div className='navbar'>
			<NavLink to='/home' activeClassName='highlight'>
				Logo
			</NavLink>

			{user.role?.name === 'admin' && (
				<div className='sub-nav'>
					<NavLink to='/shows' activeClassName='highlight'>
						Représentations
					</NavLink>
					<NavLink to='/users' activeClassName='highlight'>
						Utilisateurs
					</NavLink>
				</div>
			)}

			{user._id ? (
				<div className='user-nav'>
					<NavLink to='/profile' activeClassName='highlight'>
						{user.firstname}
					</NavLink>
					<NavLink to='/login' activeClassName='highlight' onClick={onLogout}>
						Déconnexion
					</NavLink>
				</div>
			) : (
				<div>
					<NavLink to='/login' activeClassName='highlight'>
						Connexion
					</NavLink>
					<NavLink to='/signup' activeClassName='highlight'>
						Créer un compte
					</NavLink>
				</div>
			)}
		</div>
	);
};

export default Navbar;

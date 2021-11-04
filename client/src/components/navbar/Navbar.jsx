import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { getCurrentUser, logout } from '../../services/auth-service';

import './Navbar.scss';

const Navbar = () => {
	const [showSpectatorBoard, setShowSpectatorBoard] = useState(false);
	const [showSellerBoard, setShowSellerBoard] = useState(false);
	const [showHostBoard, setShowHostBoard] = useState(false);
	const [showAdminBoard, setShowAdminBoard] = useState(false);
	const [currentUser, setCurrentUser] = useState(undefined);

	useEffect(() => {
		const user = getCurrentUser();

		if (user) {
			console.log('user in navbar: ', user);
			setCurrentUser(user);
			setShowSpectatorBoard(user.roles.includes('spectator'));
			setShowSellerBoard(user.roles.includes('seller'));
			setShowHostBoard(user.roles.includes('host'));
			setShowAdminBoard(user.roles.includes('admin'));
		}
	}, []);

	return (
		<div className='navbar'>
			<NavLink to='/home' activeClassName='highlight'>
				Logo
			</NavLink>

			{showAdminBoard && (
				<div className='sub-nav'>
					<NavLink to='/shows' activeClassName='highlight'>
						Représentations
					</NavLink>
					<NavLink to='/users' activeClassName='highlight'>
						Utilisateurs
					</NavLink>
				</div>
			)}

			{currentUser ? (
				<div className='user-nav'>
					<NavLink to='/profile' activeClassName='highlight'>
						Profil
					</NavLink>
					<NavLink to='/login' activeClassName='highlight' onClick={logout}>
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

import { NavLink } from 'react-router-dom';

import './Navbar.scss';

const Navbar = () => {
	return (
		<div className='navbar'>
			<NavLink to='/home' activeClassName='highlight'>
				Logo
			</NavLink>
			<NavLink to='/shows' activeClassName='highlight'>
				Représentations
			</NavLink>
			<NavLink to='/users' activeClassName='highlight'>
				Utilisateurs
			</NavLink>
		</div>
	);
};

export default Navbar;

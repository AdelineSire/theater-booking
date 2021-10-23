import { NavLink } from 'react-router-dom';

import './Navbar.scss';

const Navbar = () => {
	return (
		<div className='navbar'>
			<NavLink to='/home' activeClassName='highlight'>
				Logo
			</NavLink>
		</div>
	);
};

export default Navbar;

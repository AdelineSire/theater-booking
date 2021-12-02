import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Shows from './components/shows/Shows';
import Users from './components/users/Users';
import Profile from './components/profile/Profile';
import SignupForm from './components/auth/SignupForm';
import LoginForm from './components/auth/LoginForm';

import { getCurrentUser, logout } from './services/auth-service';

import './App.scss';

function App() {
	const [currentUser, setCurrentUser] = useState({});
	const onLogout = () => {
		logout();
		setCurrentUser({});
	};

	useEffect(() => {
		// const user = getCurrentUser();
		// if (user) {
		// 	console.log('user in app', user);
		// 	setCurrentUser(user);
		// }
		getCurrentUser().then((user) => setCurrentUser(user));
	}, []);

	return (
		<BrowserRouter>
			<div className='app'>
				<Navbar user={currentUser} onLogout={onLogout} />

				<Switch>
					<Route exact path={['/', '/home']}>
						<Home />
					</Route>
					<Route exact path={'/signup'}>
						<SignupForm />
					</Route>
					<Route exact path={'/login'}>
						<LoginForm />
					</Route>
					<Route exact path={'/shows'}>
						<Shows />
					</Route>
					<Route exact path={'/users'}>
						<Users />
					</Route>
					<Route exact path={'/profile'}>
						<Profile user={currentUser} onLogout={onLogout} />
					</Route>
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;

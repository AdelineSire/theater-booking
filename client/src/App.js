import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Shows from './components/shows/Shows';
import Users from './components/users/Users';
import Profile from './components/profile/Profile';
import SignupForm from './components/auth/SignupForm';
import LoginForm from './components/auth/LoginForm';

import './App.scss';

function App() {
	return (
		<BrowserRouter>
			<div className='app'>
				<Navbar />

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
						<Profile />
					</Route>
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;

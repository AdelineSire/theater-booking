import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Shows from './components/shows/Shows';
import Users from './components/users/Users';

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
					<Route exact path={'/shows'}>
						<Shows />
					</Route>
					<Route exact path={'/users'}>
						<Users />
					</Route>
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;

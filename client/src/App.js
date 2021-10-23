import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';

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
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;

import axios from 'axios';
import API_URL from './config';

const signup = (user) => {
	console.log('user in signup', user);
	return axios.post(API_URL + 'signup', user);
};

const login = (user) => {
	return axios.post(API_URL + 'signin', user).then((response) => {
		if (response.data.accessToken) {
			localStorage.setItem('user', JSON.stringify(response.data));
		}

		return response.data;
	});
};

const logout = () => {
	localStorage.removeItem('user');
};

const getCurrentUser = () => {
	const user = JSON.parse(localStorage.getItem('user'));
	if (user) {
		return axios
			.get(API_URL + 'user/' + user._id)
			.then((response) => {
				return response.data;
			})
			.catch((err) => {
				console.log('err', err);
			});
	} else return new Promise((resolve) => resolve({}));
};

export { signup, login, logout, getCurrentUser };

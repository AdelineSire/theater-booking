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
	return JSON.parse(localStorage.getItem('user'));
};

export { signup, login, logout, getCurrentUser };

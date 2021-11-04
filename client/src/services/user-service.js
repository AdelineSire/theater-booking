import axios from 'axios';
import authHeader from './auth-header';
import API_URL from './config';

const getPublicContent = () => {
	return axios.get(API_URL + 'all');
};

const getSpectatorBoard = () => {
	return axios.get(API_URL + 'user', { headers: authHeader() });
};

const getSellerBoard = () => {
	return axios.get(API_URL + 'seller', { headers: authHeader() });
};

const getHostBoard = () => {
	return axios.get(API_URL + 'host', { headers: authHeader() });
};

const getAdminBoard = () => {
	return axios.get(API_URL + 'admin', { headers: authHeader() });
};

export {
	getPublicContent,
	getSpectatorBoard,
	getSellerBoard,
	getHostBoard,
	getAdminBoard,
};

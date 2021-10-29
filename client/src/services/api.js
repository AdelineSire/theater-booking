import axios from 'axios';
import API_URL from './config';

const resData = (res) => {
	return res.data;
};

// Play
const createPlay = (play) => {
	return axios.post(API_URL + 'play', play).then(resData);
};

const getPlays = () => {
	return axios.get(API_URL + 'play').then(resData);
};

// Theater
const createTheater = (theater) => {
	return axios.post(API_URL + 'theater', theater).then(resData);
};

const getTheaters = () => {
	return axios.get(API_URL + 'theater').then(resData);
};

// Show
const createShow = (show) => {
	console.log('show in createShow', show);
	return axios.post(API_URL + 'show', show).then(resData);
};

export { createPlay, getPlays, createShow, createTheater, getTheaters };

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

// Show
const createShow = (show) => {
	return axios.post(API_URL + 'show', show).then(resData);
};

export { createPlay, getPlays, createShow };

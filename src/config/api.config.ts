
import axios from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://apiyuntas.yuntaspublicidad.com/api';


const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	},
	withCredentials: true,
});

//Manejar errores globales
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {

		}
		return Promise.reject(error);
	}
);

export default api;
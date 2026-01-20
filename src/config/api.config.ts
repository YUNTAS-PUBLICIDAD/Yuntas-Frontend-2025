import axios, { AxiosError } from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://apiyuntas.yuntaspublicidad.com/api';
export const WHATSAPP_SOCKET_URL = process.env.NEXT_PUBLIC_WHATSAPP_SERVICE_URL;
interface BackendError {
	message?: string;
	errors?: Record<string, string[]>;
	error?: string;
}

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
	(error: AxiosError<BackendError>) => {

		let userMessage = 'Error desconocido';
		
		if (error.response) {
			const backendError = error.response.data;

			// error de validacion (422)
			if (error.response.status === 422 && backendError?.errors) {
				const validationErrors = Object.entries(backendError.errors)
					.map(([field, messages]) => `- ${field}: ${messages.join(', ')}`).join('\n');
				userMessage = `Errores de validacion:\n${validationErrors}`;
			}
			// mensaje especifico del backend
			else if (backendError?.message) {
				userMessage = backendError.message;
			}
			// error generico del backend
			else if (backendError?.error) {
				userMessage = backendError.error;
			}
			// error segun codigo HTTP
			else {
				switch (error.response.status) {
					case 401:
						userMessage = 'No estás autenticado. Por favor, inicia sesión.';
						break;
					case 403:
						userMessage = 'No tienes permisos para realizar esta acción.';
						break;
					case 404:
						userMessage = 'El recurso solicitado no existe.';
						break;
					case 500:
						userMessage = 'Error interno del servidor. Intenta más tarde.';
						break;
					case 503:
						userMessage = 'Servicio no disponible. Intenta más tarde.';
						break;
					default:
						userMessage = `Error del servidor (código ${error.response.status})`;
				}
			}
		} else if (error.request) {
			// error de red
			userMessage = 'Error de conexión. Verifica tu internet.';
		}
		error.message = userMessage;

		return Promise.reject(error);
	}
);

export default api;
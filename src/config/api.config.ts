import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://apiyuntas.yuntaspublicidad.com/api';
export const WHATSAPP_SOCKET_URL = process.env.NEXT_PUBLIC_WHATSAPP_SERVICE_URL;

interface BackendError {
	message?: string;
	errors?: Record<string, string[]>;
	error?: string;
}

interface RetryConfig extends InternalAxiosRequestConfig {
	_retry?: number;
	_retryCount?: number;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 segundo

const api = axios.create({
	baseURL: BASE_URL,
	timeout: 30000,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	}
});

//Manejar errores globales
api.interceptors.response.use(
	(response) => response,
	async (error: AxiosError<BackendError>) => {
		const config = error.config as RetryConfig;
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
			console.log(error);
			console.error('Network Error Details:', {
                url: config?.url,
                method: config?.method,
                baseURL: config?.baseURL,
                headers: config?.headers,
                timeout: config?.timeout,
                code: error.code,
                message: error.message,
            });
			
			if (!config) {
				userMessage = 'Error de conexión. No se pudo configurar la petición.';
			} else {
				config._retryCount = config._retryCount ?? 0;

				if (config._retryCount < MAX_RETRIES) {
					config._retryCount += 1;

					await new Promise(resolve =>
						setTimeout(resolve, RETRY_DELAY * config._retryCount!)
					);

					// Reintentar la petición
					return api(config);
				}

				// Máximo de reintentos alcanzado
				userMessage = `Error de conexión después de ${MAX_RETRIES} intentos.`;
			}
		}
		error.message = userMessage;

		return Promise.reject(error);
	}
);

export default api;
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getToken, setToken, removeToken } from '@/utils/token';
import { removeRole } from '@/utils/role';
import { API_ENDPOINTS } from './endpoints';

const getBaseUrl = (): string => {
	const envUrl = process.env.NEXT_PUBLIC_API_URL;
	if (!envUrl) {
		return 'https://apiyuntas.yuntaspublicidad.com/api';
	}
	const cleanUrl = envUrl.trim();
	if (!cleanUrl.endsWith('/api') && !cleanUrl.endsWith('/api/')) {
		return cleanUrl.endsWith('/') ? `${cleanUrl}api` : `${cleanUrl}/api`;
	}
	return cleanUrl;
};

export const BASE_URL = getBaseUrl();
export const WHATSAPP_SOCKET_URL = process.env.NEXT_PUBLIC_WHATSAPP_SERVICE_URL;

interface BackendError {
	message?: string;
	errors?: Record<string, string[]>;
	error?: string;
}

interface RetryConfig extends InternalAxiosRequestConfig {
	_retry?: boolean;
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

// ─── Request Interceptor: Adjuntar token y emular métodos PUT/PATCH/DELETE ───
api.interceptors.request.use(
	(config) => {
		const token = getToken();
		if (token && !(config as any).skipAuth) {   // 👈 respeta el flag
			config.headers.Authorization = `Bearer ${token}`;
		}

		// Emular métodos PUT, PATCH o DELETE usando POST para evitar bloqueos de Firewalls (WAF) en producción
		const method = config.method?.toUpperCase();
		if (method && ['PUT', 'PATCH', 'DELETE'].includes(method)) {
			config.method = 'post';
			config.headers['X-HTTP-Method-Override'] = method;

			if (config.data instanceof FormData) {
				config.data.append('_method', method);
			} else if (typeof config.data === 'object' && config.data !== null) {
				config.data = {
					...config.data,
					_method: method,
				};
			} else if (!config.data) {
				config.data = { _method: method };
			}
		}

		return config;
	},
	(error) => Promise.reject(error)
);

// ─── Response Interceptor: Refresh token en 401 ───
let isRefreshing = false;
let failedQueue: Array<{
	resolve: (token: string | null) => void;
	reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});
	failedQueue = [];
};

api.interceptors.response.use(
	(response) => response,
	async (error: AxiosError<BackendError>) => {
		const config = error.config as RetryConfig;
		let userMessage = 'Error desconocido';

		if (error.response) {
			const backendError = error.response.data;

			// ─── Token inválido o expirado (401) → intentar refresh ───
			if (
				error.response.status === 401 &&
				!config._retry &&
				!config.url?.includes(API_ENDPOINTS.AUTH.REFRESH)
			) {
				// Si ya se está refrescando, encolar esta petición
				if (isRefreshing) {
					return new Promise((resolve, reject) => {
						failedQueue.push({ resolve, reject });
					})
						.then((token) => {
							config.headers['Authorization'] = 'Bearer ' + token;
							return api(config);
						})
						.catch((err) => Promise.reject(err));
				}

				config._retry = true;
				isRefreshing = true;

				try {
					const refreshUrl = `${BASE_URL}${API_ENDPOINTS.AUTH.REFRESH}`;
					const response = await axios.post(refreshUrl, {}, {
						headers: {
							Authorization: `Bearer ${getToken()}`
						}
					});

					const newToken = response.data.data.token;
					setToken(newToken);

					api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
					config.headers['Authorization'] = `Bearer ${newToken}`;

					processQueue(null, newToken);
					return api(config);
				} catch (refreshError) {
					processQueue(refreshError, null);
					// Si el refresh falla, cerrar sesión
					removeToken();
					removeRole();
					if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
						window.location.href = '/login';
					}
					return Promise.reject(refreshError);
				} finally {
					isRefreshing = false;
				}
			}

			// error de validación (422)
			if (error.response.status === 422 && backendError?.errors) {
				const validationErrors = Object.entries(backendError.errors)
					.map(([field, messages]) => `- ${field}: ${messages.join(', ')}`).join('\n');
				userMessage = `Errores de validacion:\n${validationErrors}`;
			}
			// mensaje específico del backend
			else if (backendError?.message) {
				userMessage = backendError.message;
			}
			// error genérico del backend
			else if (backendError?.error) {
				userMessage = backendError.error;
			}
			// error según código HTTP
			else {
				switch (error.response.status) {
					case 401:
						userMessage = 'Sesión expirada. Por favor, inicia sesión nuevamente.';
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
					console.warn(`Error de conexión. Reintentando (${config._retryCount}/${MAX_RETRIES})...`);

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

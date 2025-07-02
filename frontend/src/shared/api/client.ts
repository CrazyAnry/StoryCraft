import axios from "axios";
import { useAuthStore } from "../stores";

// Функция безопасного доступа к setUser вне компонента
const getSetUser = () => {
	if (typeof window !== "undefined") {
		try {
			return useAuthStore.getState().setUser;
		} catch {
			return () => {};
		}
	}
	return () => {};
};

export const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001",
	withCredentials: true,
	timeout: 10000,
});

export const axiosSecondary = axios.create({
	baseURL:
		process.env.NEXT_PUBLIC_API_SECONDARY_URL ||
		"https://reimagined-tribble-pjjvj5vr44wrcjgj-8080.app.github.dev",
	withCredentials: true,
	timeout: 10000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
	(config) => {
		if (typeof window !== "undefined") {
			const token = localStorage.getItem("accessToken");
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// Response interceptor
axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const refreshToken =
					typeof window !== "undefined"
						? localStorage.getItem("refreshToken")
						: null;
				if (!refreshToken) throw new Error("No refresh token");

				const response = await axios.post(
					`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
					{ refreshToken },
					{ withCredentials: true },
				);

				const { accessToken, user } = response.data;
				localStorage.setItem("accessToken", accessToken);

				const setUser = getSetUser();
				if (user) {
					setUser(user);
				}

				originalRequest.headers.Authorization = `Bearer ${accessToken}`;
				return axiosInstance(originalRequest);
			} catch (refreshError) {
				// Очистка и редирект
				localStorage.removeItem("accessToken");
				localStorage.removeItem("refreshToken");

				const setUser = getSetUser();
				setUser(null);

				if (typeof window !== "undefined") {
					window.location.href = "/auth/login";
				}

				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	},
);

export default axiosInstance;

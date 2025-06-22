import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in headers
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // If the error is due to an expired token, try to refresh it
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(
          `${API_BASE_URL}/api/auth/token/refresh/`,
          { token: refreshToken }
        );
        localStorage.setItem("accessToken", response.data.access);
        http.defaults.headers.common.Authorization = `Bearer ${response.data.access}`;
        return http(originalRequest);
      } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default http;

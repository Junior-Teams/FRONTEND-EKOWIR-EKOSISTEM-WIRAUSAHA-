import axios from "axios"

export const HOST_API = import.meta.env.VITE_HOST_API;
const axiosInstance = axios.create({
  baseURL: HOST_API, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") // Get token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}` // Add token to headers if available
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// A 401 from /token just means wrong credentials, and a 401 from
// /secured/logout means the token was already dead - both must reach the
// caller instead of triggering the expired-session redirect below.
const AUTH_401_WHITELIST = ["/token", "/secured/logout"]

// Middleware token JWT
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const requestUrl = error.config?.url ?? ""
    const isAuthAttempt = AUTH_401_WHITELIST.some((path) =>
      requestUrl.includes(path)
    )
    if (error.response?.status === 401 && !isAuthAttempt) {
      localStorage.removeItem('token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);
export default axiosInstance
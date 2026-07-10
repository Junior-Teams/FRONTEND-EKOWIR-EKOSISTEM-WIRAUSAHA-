import axios from "axios"

const HOST_API = import.meta.env.VITE_HOST_API;
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

// Middleware token JWT
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);
export default axiosInstance
import axios from "axios";

const axiosBase = axios.create({
  baseURL: "http://localhost:5500/api", // Add back /api prefix
  headers: {
    "Content-Type": "application/json",
  },
});

axiosBase.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
axiosBase.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data);
    return Promise.reject(error);
  }
);

export default axiosBase;

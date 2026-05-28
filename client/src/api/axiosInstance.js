import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://learntowin-skill-based-learning-and-8h8a.onrender.com/api",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;

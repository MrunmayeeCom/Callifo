import axios from "axios";

const CallifoAPI = axios.create({
  baseURL: "https://callifo.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

CallifoAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default CallifoAPI;

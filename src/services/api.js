import axios from "axios";
import Config from "../envVars";
import useAuthStore from "../store/authStore";

const api = axios.create({
  baseURL: `${Config.BACKEND_URL}/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
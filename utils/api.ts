import axios from "axios";
import { getToken } from "./tokenStorage";

const api = axios.create({
  baseURL: "http://192.168.1.3:8000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

import axios from "axios";
import { getToken } from "./tokenStorage";

const api = axios.create({
  baseURL: "https://api.ayoubbezai.site/api",
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

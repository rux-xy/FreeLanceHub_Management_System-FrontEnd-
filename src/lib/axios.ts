import axios from 'axios';
import { STORAGE_KEYS, readStore, removeStore } from './storage';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = readStore<string | null>(STORAGE_KEYS.TOKEN, null);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add this — clears stale token and redirects to login on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeStore(STORAGE_KEYS.TOKEN);
      removeStore(STORAGE_KEYS.CURRENT_USER);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export { api };

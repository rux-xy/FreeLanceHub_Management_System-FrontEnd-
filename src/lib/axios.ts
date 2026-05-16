import axios from 'axios';
import { STORAGE_KEYS, readStore } from './storage';

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

export { api };

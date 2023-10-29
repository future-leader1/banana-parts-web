import axios from 'axios';
import { OpenAPI } from 'generated/api/front/core/OpenAPI';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  const token = OpenAPI.TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

export { api };

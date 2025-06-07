// frontend/src/lib/axios.js

import axios from 'axios';

const isDevelopment = process.env.NODE_ENV === 'development';
console.log('Is development:', isDevelopment);

const baseURL = isDevelopment ? import.meta.env.VITE_API_URL : '/api';
console.log('current baseURL', baseURL);

const axiosInstance = axios.create({
  baseURL,
});

export { axiosInstance };
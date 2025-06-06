// frontend/src/lib/axios.js

import axios from 'axios';
import { isMobile } from 'device-detect';

const isDevelopment = process.env.NODE_ENV === 'development';
console.log('Is development:', isDevelopment);

const getBaseURL = () => {
  const baseURL = isDevelopment 
    ? import.meta.env.VITE_API_URL 
    : isMobile 
      ? `${window.location.protocol}://${window.location.host}/api` 
      : '/api';

  console.log('current baseURL:', baseURL);
  return baseURL;
};

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
});

export { axiosInstance };
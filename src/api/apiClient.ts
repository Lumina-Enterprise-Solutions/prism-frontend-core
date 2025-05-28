/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

export const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

let isRefreshing = false;
let failedQueue: any[] = [];


const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    failedQueue = [];
  };

axiosClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token');
    const tenantId = localStorage.getItem('tenant_id');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    if (tenantId) config.headers['X-Tenant-ID'] = tenantId;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = 'Bearer ' + token;
            return axiosClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = Cookies.get('refresh_token');

      if (!refreshToken) {
        toast.error('Session expired. Please login again.');
        isRefreshing = false;
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
          refresh_token: refreshToken,
        });

        const newAccessToken = response.data?.data?.access_token;
        const newRefreshToken = response.data?.data?.refresh_token;

        Cookies.set('access_token', newAccessToken, { secure: true });
        Cookies.set('refresh_token', newRefreshToken, { secure: true });

        axiosClient.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = 'Bearer ' + newAccessToken;
        return axiosClient(originalRequest);
      } catch (err) {
        processQueue(err, null);
        toast.error('Session expired. Please login again.');
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
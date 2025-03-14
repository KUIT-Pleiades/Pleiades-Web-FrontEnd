import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuth } from '../store/authStore';
import { AuthToken } from '../interfaces/Interfaces';

const BASEURL = import.meta.env.VITE_SERVER_URL;

// InternalAxiosRequestConfig를 확장하여 _retry 프로퍼티를 추가합니다.
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const axiosInstance = axios.create({
  baseURL: BASEURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 현재 access token을 헤더에 추가
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuth.getState().authorization;
    config.headers = config.headers || {};
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: access token 만료 시 refresh token 호출 후 재요청
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    if ((error.response?.status === 401 || error.response?.status === 428) && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // refresh token 호출 예시 (GET 방식)
        const refreshResponse = await axios.get<AuthToken>(`${BASEURL}/auth/refresh`, {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        });
        const newToken = refreshResponse.data.accessToken;
        // 새로운 토큰을 상태에 업데이트
        useAuth.getState().setToken(newToken);
        // 원래 요청의 헤더에 새로운 토큰 추가 후 재요청
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("토큰 갱신 실패:", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
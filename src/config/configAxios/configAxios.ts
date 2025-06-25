import { Props } from '@/types/configAxios/axiosConfigType';
import axios, { AxiosError } from 'axios';

export const axiosInstanceFormData = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // URL base de la API
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // URL base de la API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Puedes agregar interceptores aquí si es necesario (por ejemplo, para manejar tokens de autenticación)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const baseQueryconfigFormData = async <T>({ url, method = 'GET', body, params }: Props<T>) => {
  try {
    const response = await axiosInstanceFormData({
      url,
      method,
      data: body,
      params: params
    });

    return { data: response.data };
  } catch (error: unknown) {
    // Verificamos si el error es un AxiosError

    const axiosError = error as AxiosError;
    if (axios.isAxiosError(error)) {

      // Devolvemos el error con el mensaje y código de estado de la respuesta
      return {
        error: {
          data: axiosError.response?.data || 'Error de conexión',
          status: axiosError.response?.status || 500,
        },
      };
    }
    // Error genérico si no es un AxiosError
    return {
      error: {
        message: 'Error desconocido.',
        status: 500,
      },
    };
  }
}

export const baseQueryconfig = async <T>({ url, method = 'GET', body,params }: Props<T>) => {
  try {
    const response = await axiosInstance({
      url,
      method,
      data: body,
      params: params
    });

    return { data: response.data };
  } catch (error: unknown) {
    // Verificamos si el error es un AxiosError

    const axiosError = error as AxiosError;
    if (axios.isAxiosError(error)) {

      // Devolvemos el error con el mensaje y código de estado de la respuesta
      return {
        error: {
          data: axiosError.response?.data || 'Error de conexión',
          status: axiosError.response?.status || 500,
        },
      };
    }
    // Error genérico si no es un AxiosError
    return {
      error: {
        message: 'Error desconocido.',
        status: 500,
      },
    };
  }
}
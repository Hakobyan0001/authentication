import axios, { AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios';

const baseApiUrl = 'http://localhost:8080';

interface RequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  params?: Record<string, any>;
  data?: any;
}

class BaseRESTService {
  async run(route: string, options: RequestOptions) {
    let headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    const config: AxiosRequestConfig = {
      method: options.method,
      url: `${baseApiUrl}${route}`,
      data: options.data,
      headers,
      params: options.params
    };

    try {
      const response: AxiosResponse = await axios(config);
      return response;
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          console.error(`Request failed with status ${error.response.status}`);
        } else if (error.request) {
          console.error('Request made but no response received');
        } else {
          console.error('Error setting up the request');
        }
      }
      throw error;
    }
  }
}

const base = new BaseRESTService();
export default base;

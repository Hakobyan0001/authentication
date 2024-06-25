import axios, { AxiosRequestConfig, isAxiosError } from 'axios';
const baseApiUrl = 'http://localhost:8080';

class BaseRESTService {
  async run(rout: string, options: any) {
    let headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    const config: AxiosRequestConfig = {
      method: options.method,
      url: baseApiUrl + rout,
      data: options.data,
      headers,
      params: options.params || ''
    };

    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 401) {
        console.error('Unauthorized access - possibly invalid token');
      }
      throw error;
    }
  }
}

const base = new BaseRESTService();
export default base;

import axios from 'axios';
const baseApiUrl = 'http://localhost:8080';

class BaseRESTService {
  token = '';

  setToken(token: string) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  run(rout: string, options: any) {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: ''
    };

    if (options.headers) {
      headers = { ...headers, ...options.headers };
    }

    if (this.token) {
      headers.Authorization = 'Bearer ' + this.token;
    }

    const config = {
      method: options.method,
      url: baseApiUrl + rout,
      data: options.data,
      headers,
      params: ''
    };

    if (options.params) {
      config.params = options.params;
    }
    return axios(config)
      .then((response) => response)
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.error('Unauthorized access - possibly invalid token');
        }
        throw error;
      });
  }
}
const base = new BaseRESTService();
export default base;

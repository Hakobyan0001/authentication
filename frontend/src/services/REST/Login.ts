import base from './BaseRESTService';

interface LoginData {
  email: string;
  password: string;
}

export const loginRequest = async (data: LoginData) => {
  const response = await base.run('/auth/login', {
    method: 'POST',
    data
  });

  return response;
};

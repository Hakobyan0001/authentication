import base from './BaseRESTService';

export const loginRequest = async (data: any) => {
  try {
    const response = await base.run('/auth/login', {
      method: 'POST',
      data
    });

    return response;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

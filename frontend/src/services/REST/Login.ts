import base from './BaseRESTService';

export const loginRequest = (data: any) => {
  return base.run('/auth/login', {
    method: 'POST',
    data
  });
};

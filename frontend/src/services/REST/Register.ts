import base from './BaseRESTService';

export const registerRequest = (data: any) => {
  return base.run('/auth/register', {
    method: 'POST',
    data
  });
};

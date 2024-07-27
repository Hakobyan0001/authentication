import base from './BaseRESTService';

export const homeRequest = async () => {
  const response = await base.run('/home', {
    method: 'GET'
  });

  return response;
};

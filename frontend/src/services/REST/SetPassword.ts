import base from './BaseRESTService';

export const setPasswordRequest = (data: any) => {
  return base.run('/auth/SetPassword', {
    method: 'PATCH',
    data
  });
};

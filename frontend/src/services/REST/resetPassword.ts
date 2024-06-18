import base from './BaseRESTService';

export const resetPasswordRequest = (data: any) => {
  return base.run('/auth/resetPassword', {
    method: 'POST',
    data
  });
};

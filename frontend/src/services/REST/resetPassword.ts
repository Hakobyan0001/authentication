import base from './BaseRESTService';

interface ResetPasswordData {
  email: string;
}

export const resetPasswordRequest = (data: ResetPasswordData) => {
  return base.run('/auth/resetPassword', {
    method: 'POST',
    data
  });
};

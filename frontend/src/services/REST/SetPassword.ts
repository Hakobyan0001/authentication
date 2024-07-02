import base from './BaseRESTService';

interface SetPasswordData {
  token: string;
  password: string;
}

export const setPasswordRequest = (data: SetPasswordData) => {
  return base.run('/auth/SetPassword', {
    method: 'PATCH',
    data
  });
};

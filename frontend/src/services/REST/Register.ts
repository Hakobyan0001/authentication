import base from './BaseRESTService';

interface RegisterData {
  fullName: string;
  email: string;
  newPassword: string;
}

export const registerRequest = (data: RegisterData) => {
  return base.run('/auth/register', {
    method: 'POST',
    data
  });
};

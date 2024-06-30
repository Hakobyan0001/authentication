import { createAsyncThunk } from '@reduxjs/toolkit';

import { registerRequest } from '../../services/REST/Register';
import { setSnackbarMessage } from '../slices/SnackBarSlice';

type RegisterUserPayload = {
  fullName: string;
  email: string;
  newPassword: string;
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterUserPayload, { dispatch }) => {
    try {
      const response = await registerRequest(userData);
      dispatch(
        setSnackbarMessage({ message: response.data.message, severity: response.data.severity })
      );
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      dispatch(
        setSnackbarMessage({
          message: error.response.data.message,
          severity: error.response.data.severity
        })
      );
    }
  }
);

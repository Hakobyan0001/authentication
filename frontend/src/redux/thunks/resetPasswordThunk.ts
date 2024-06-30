import { createAsyncThunk } from '@reduxjs/toolkit';

import { resetPasswordRequest } from '../../services/REST/resetPassword';
import { setSnackbarMessage } from '../slices/SnackBarSlice';

type resetPasswordUserPayload = {
  email: string;
};

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (userData: resetPasswordUserPayload, { dispatch }) => {
    try {
      const response = await resetPasswordRequest(userData);
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

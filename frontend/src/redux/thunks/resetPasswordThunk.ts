import { createAsyncThunk } from '@reduxjs/toolkit';

import { resetPasswordRequest } from '../../services/REST/resetPassword';
import { setSnackbarMessage } from '../slices/SnackBarSlice';

interface ResetPasswordResponse {
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
  token: string;
}
interface ResetPasswordError {
  message: string;
  severity: 'error';
}

interface ResetPasswordThunkArgs {
  email: string;
}

export const resetPassword = createAsyncThunk<
  ResetPasswordResponse,
  ResetPasswordThunkArgs,
  { rejectValue: ResetPasswordError }
>('auth/resetPassword', async (userData: ResetPasswordThunkArgs, { dispatch, rejectWithValue }) => {
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
    return rejectWithValue(error.response.data);
  }
});

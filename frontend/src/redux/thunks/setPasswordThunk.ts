import { createAsyncThunk } from '@reduxjs/toolkit';

import { setPasswordRequest } from '../../services/REST/SetPassword';
import { setSnackbarMessage } from '../slices/SnackBarSlice';

interface SetPasswordResponse {
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}

interface SetPasswordError {
  message: string;
  severity: 'error';
}

interface SetPasswordThunkArgs {
  token: string;
  password: string;
}

export const setPassword = createAsyncThunk<
  SetPasswordResponse,
  SetPasswordThunkArgs,
  { rejectValue: SetPasswordError }
>('auth/setPassword', async (data: SetPasswordThunkArgs, { dispatch, rejectWithValue }) => {
  try {
    const response = await setPasswordRequest(data);
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

import { createAsyncThunk } from '@reduxjs/toolkit';

import { setPasswordRequest } from '../../services/REST/SetPassword';
import { setSnackbarMessage } from '../slices/SnackBarSlice';

type setPasswordUserPayload = {
  token: string;
  password: string;
};

export const setPassword = createAsyncThunk(
  'auth/setPassword',
  async (data: setPasswordUserPayload, { dispatch }) => {
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
    }
  }
);

import { createAsyncThunk } from '@reduxjs/toolkit';

import { homeRequest } from '../../services/REST/Home';
import { setSnackbarMessage } from '../slices/SnackBarSlice';

interface homeResponse {
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
  token: string;
}
interface homeError {
  message: string;
  severity: 'error';
}

export const buttonClick = createAsyncThunk<homeResponse, void, { rejectValue: homeError }>(
  'home',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await homeRequest();
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
  }
);

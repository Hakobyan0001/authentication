import { createAsyncThunk } from '@reduxjs/toolkit';
import { setPasswordRequest } from '../../services/REST/SetPassword';

type setPasswordUserPayload = {
  token: string;
  password: string;
};

export const setPassword = createAsyncThunk(
  'auth/setPassword',
  async (data: setPasswordUserPayload, { rejectWithValue }) => {
    try {
      const response = await setPasswordRequest(data);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

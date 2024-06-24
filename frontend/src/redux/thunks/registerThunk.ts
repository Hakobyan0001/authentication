import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerRequest } from '../../services/REST/Register';

type RegisterUserPayload = {
  fullName: string;
  email: string;
  newPassword: string;
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterUserPayload, { rejectWithValue }) => {
    try {
      const response = await registerRequest(userData);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

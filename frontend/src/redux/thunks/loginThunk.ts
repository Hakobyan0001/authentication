import { createAsyncThunk } from '@reduxjs/toolkit';

import { loginRequest } from '../../services/REST/Login';
import { setAuthCookies } from '../../utils/setAuthCookies';

type LoginUserPayload = {
  email: string;
  password: string;
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (loginData: LoginUserPayload, { rejectWithValue }) => {
    try {
      const response = await loginRequest(loginData);
      const { token, email, fullName } = response.data;
      setAuthCookies({ token, email, fullName });

      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

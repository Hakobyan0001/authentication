import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type LoginUserPayload = {
  id: string;
  fullName: string;
  email: string;
};

type LoginUserError = {
  message: string;
};

export const loginUser = createAsyncThunk<
  LoginUserPayload,
  { email: string; password: string },
  { rejectValue: LoginUserError }
>('auth/loginUser', async (loginData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/login', loginData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue({ message: error.response.data });
  }
});

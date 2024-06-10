import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type RegisterUserPayload = {
  fullName: string;
  email: string;
  password: string;
};

type RegisterUserError = {
  message: string;
};

export const registerUser = createAsyncThunk<
  RegisterUserPayload,
  { rejectValue: RegisterUserError }
>('auth/registerUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/register', userData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue({ message: error.response.data });
  }
});

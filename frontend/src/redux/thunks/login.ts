import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface RegisterUserPayload {
  id: string;
  name: string;
  email: string;
}

interface RegisterUserError {
  message: string;
}

export const login = createAsyncThunk<
  RegisterUserPayload,
  { name: string; email: string; password: string },
  { rejectValue: RegisterUserError }
>('auth/registerUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/register', userData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue({ message: error.response.data });
  }
});

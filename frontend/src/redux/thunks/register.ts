import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type RegisterUserPayload = {
  fullName: string;
  email: string;
  password: string;
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterUserPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/auth/register', userData);
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

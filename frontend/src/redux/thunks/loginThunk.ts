import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginRequest } from '../../services/REST/Login';
import storage from '../../services/storage';
import baseRESTService from '../../services/REST/BaseRESTService';

type LoginUserPayload = {
  email: string;
  password: string;
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (loginData: LoginUserPayload, { rejectWithValue }) => {
    try {
      const response = await loginRequest(loginData);
      const user = JSON.stringify(response.data);
      storage.addUser('user', user);
      baseRESTService.setToken(response.data.token);

      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue({ message: error.response.data });
    }
  }
);

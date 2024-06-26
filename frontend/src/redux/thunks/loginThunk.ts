import { createAsyncThunk } from '@reduxjs/toolkit';

import cookieService from '../../services/CookieService';
import { loginRequest } from '../../services/REST/Login';
import storage from '../../services/storage';
import { setUserData } from '../slices/authSlice';

type LoginUserPayload = {
  email: string;
  password: string;
  isRememberMe: boolean;
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (loginData: LoginUserPayload, { dispatch, rejectWithValue }) => {
    try {
      const response = await loginRequest(loginData);
      const { token, email, fullName } = response.data;
      if (loginData.isRememberMe) {
        cookieService.setCookieWithRemMe('token', token);
        cookieService.setCookieWithRemMe('userInfo', { email, fullName });
      } else {
        cookieService.setCookieWithoutRemMe('token', token);
        cookieService.setCookieWithoutRemMe('userInfo', { email, fullName });
      }
      storage.addUser('userDataLoaded', true);
      dispatch(setUserData(response.data));
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

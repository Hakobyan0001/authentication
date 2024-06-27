import { jwtDecode } from 'jwt-decode';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { localStorage, sessionStorage } from '../../services';
import { loginRequest } from '../../services/REST/Login';
import { setUserData } from '../slices/authSlice';
type LoginUserPayload = {
  email: string;
  password: string;
  isRememberMe: boolean;
};
type JwtPayload = {
  email: string;
  fullName: string;
  exp: number;
  iat: number;
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (loginData: LoginUserPayload, { dispatch, rejectWithValue }) => {
    try {
      const response = await loginRequest(loginData);
      const jwtToken = response.data.token;
      const decoded: JwtPayload = jwtDecode(jwtToken);

      if (!loginData.isRememberMe) {
        sessionStorage.addItem('authToken', jwtToken);
      } else {
        localStorage.addItem('authToken', jwtToken);
      }

      dispatch(setUserData({ email: decoded.email, fullName: decoded.fullName }));
      return response.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

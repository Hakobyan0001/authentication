import { jwtDecode } from 'jwt-decode';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { localStorage, sessionStorage } from '../../services';
import { loginRequest } from '../../services/REST/Login';
import { setUserData } from '../slices/authSlice';
import { setSnackbarMessage } from '../slices/SnackBarSlice';

interface LoginResponse {
  token: string;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}

interface LoginError {
  message: string;
  severity: 'error';
}

interface LoginUserPayload {
  email: string;
  password: string;
  isRememberMe: boolean;
}

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginUserPayload,
  { rejectValue: LoginError }
>('auth/login', async (loginData: LoginUserPayload, { dispatch, rejectWithValue }) => {
  try {
    const response = await loginRequest(loginData);
    const jwtToken = response.data.token;
    const decoded = jwtDecode(jwtToken) as { email: string; fullName: string };

    if (!loginData.isRememberMe) {
      sessionStorage.addItem('authToken', jwtToken);
    } else {
      localStorage.addItem('authToken', jwtToken);
    }

    dispatch(
      setSnackbarMessage({ message: response.data.message, severity: response.data.severity })
    );
    dispatch(setUserData({ email: decoded.email, fullName: decoded.fullName }));

    return response.data;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }

    dispatch(
      setSnackbarMessage({
        message: error.response.data.message,
        severity: error.response.data.severity
      })
    );

    return rejectWithValue(error.response.data);
  }
});

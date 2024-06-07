// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { registerUser } from '../thunks/register';

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

type User = {
  id: string;
  name: string;
  email: string;
};

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Registration failed';
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

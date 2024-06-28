import { createSlice } from '@reduxjs/toolkit';

import { loginUser } from '../thunks/loginThunk';

type LoginState = {
  loading: boolean;
  success: boolean;
  error: string | null;
};

const initialState: LoginState = {
  loading: false,
  success: false,
  error: null
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as { message: string }).message
          : 'Login failed';
        state.success = false;
      });
  }
});

export default loginSlice.reducer;

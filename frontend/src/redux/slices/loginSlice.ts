import { createSlice } from '@reduxjs/toolkit';

import { loginUser } from '../thunks/loginThunk';

type LoginState = {
  loading: boolean;
  success: boolean;
  error: boolean;
};

const initialState: LoginState = {
  loading: false,
  success: false,
  error: false
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.success = false;
        state.error = true;
      });
  }
});

export default loginSlice.reducer;

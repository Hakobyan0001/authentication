import { createSlice } from '@reduxjs/toolkit';

import { registerUser } from '../thunks/registerThunk';

type RegisterState = {
  loading: boolean;
  error: boolean;
  success: boolean;
};

const initialState: RegisterState = {
  loading: false,
  error: false,
  success: false
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.success = false;
      });
  }
});

export default registerSlice.reducer;

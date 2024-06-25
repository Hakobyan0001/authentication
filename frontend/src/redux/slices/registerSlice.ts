import { createSlice } from '@reduxjs/toolkit';

import { registerUser } from '../thunks/registerThunk';

type RegisterState = {
  loading: boolean;
  error: string | null;
  success: boolean;
};

const initialState: RegisterState = {
  loading: false,
  error: null,
  success: false
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    resetRegisterState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as { message: string }).message
          : 'Registration failed';
        state.success = false;
      });
  }
});

export const { resetRegisterState } = registerSlice.actions;
export default registerSlice.reducer;

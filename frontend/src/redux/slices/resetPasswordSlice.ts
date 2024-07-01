import { createSlice } from '@reduxjs/toolkit';

import { resetPassword } from '../thunks/resetPasswordThunk';

type ResetPasswordState = {
  loading: boolean;
  success: boolean;
  error: boolean;
};

const initialState: ResetPasswordState = {
  loading: false,
  success: false,
  error: false
};

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;

        console.log(action.payload.token);
      })
      .addCase(resetPassword.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.success = false;
      });
  }
});

// export const {} = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;

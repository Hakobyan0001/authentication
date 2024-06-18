import { createSlice } from '@reduxjs/toolkit';
import { resetPassword } from '../thunks/resetPasswordThunk';

type ResetPasswordState = {
  token: string | null;
  loading: boolean;
  success: boolean;
  error: string | null;
};

const initialState: ResetPasswordState = {
  token: null,
  loading: false,
  success: false,
  error: null
};

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.token = action.payload;
        console.log(state.token);
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as { message: string }).message
          : 'reset password is failed';
        state.success = false;
      });
  }
});

export const {} = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;

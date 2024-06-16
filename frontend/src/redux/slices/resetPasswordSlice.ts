import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser } from '../thunks/loginThunk';

type ResetPasswordState = {
  user: userState | null;
  loading: boolean;
  success: boolean;
  error: string | null;
};

type userState = {
  email: string;
  full_name: string;
};
const initialState: ResetPasswordState = {
  user: null,
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
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<userState>) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
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

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login } from '../thunks/login';

interface LoginState {
  user: { id: string; name: string; email: string } | null;
  loading: boolean;
  error: string | null;
}

const initialState: LoginState = {
  user: null,
  loading: false,
  error: null
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    resetLoginState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ id: string; name: string; email: string }>) => {
          state.loading = false;
          state.user = action.payload;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Login failed';
      });
  }
});

export const { resetLoginState } = loginSlice.actions;
export default loginSlice.reducer;

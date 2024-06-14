import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser } from '../thunks/loginThunk';

type LoginState = {
  user: userState | null;
  loading: boolean;
  success: boolean;
  error: string | null;
};

type userState = {
  id: string;
  fullName: string;
  email: string;
};
const initialState: LoginState = {
  user: null,
  loading: false,
  success: false,
  error: null
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    }
  },
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
          : 'Login failed';
        state.success = false;
      });
  }
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;

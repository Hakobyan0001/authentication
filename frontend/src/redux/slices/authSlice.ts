import { createSlice } from '@reduxjs/toolkit';

type AuthState = {
  user: User | null;
};

type User = {
  token: string;
  email: string;
  fullName: string;
};

const initialState: AuthState = {
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData(state, action) {
      state.user = action.payload;
    },
    clearUserData(state) {
      state.user = null;
    }
  }
});

export const { setUserData, clearUserData } = authSlice.actions;
export default authSlice.reducer;

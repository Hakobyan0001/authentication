import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  id: string;
  fullName: string;
  email: string;
};

type AuthState = {
  user: User | null;
};

const initialState: AuthState = {
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    }
  }
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;

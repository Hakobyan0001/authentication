import { jwtDecode } from 'jwt-decode';

import { createSlice } from '@reduxjs/toolkit';

import { localStorage, sessionStorage } from '../../services';

interface User {
  email: string;
  fullName: string;
}
interface AuthState {
  user: User | null;
}

const storedAuthToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

const userData = storedAuthToken ? jwtDecode<User>(storedAuthToken) : null;

const initialState: AuthState = {
  user: userData ? { email: userData.email, fullName: userData.fullName } : null
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
      localStorage.deleteItem('authToken');
      sessionStorage.deleteItem('authToken');
    }
  }
});

export const { setUserData, clearUserData } = authSlice.actions;
export default authSlice.reducer;

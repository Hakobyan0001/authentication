import { createSlice } from '@reduxjs/toolkit';

import { loginUser } from '../thunks/loginThunk';

interface HomeState {
  loading: boolean;
  success: boolean;
  error: boolean;
}

const initialState: HomeState = {
  loading: false,
  success: false,
  error: false
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.success = false;
        state.error = true;
      });
  }
});

export default homeSlice.reducer;

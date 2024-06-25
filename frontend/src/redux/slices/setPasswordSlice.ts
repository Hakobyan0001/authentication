import { createSlice } from '@reduxjs/toolkit';

import { setPassword } from '../thunks/setPasswordThunk';

type setPasswordState = {
  loading: boolean;
  success: boolean;
  error: string | null;
};

const initialState: setPasswordState = {
  loading: false,
  success: false,
  error: null
};

const setPasswordSlice = createSlice({
  name: 'setPassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(setPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(setPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as { message: string }).message
          : 'Set password is failed';
        state.success = false;
      });
  }
});

// export const {} = setPasswordSlice.actions;
export default setPasswordSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}

const initialState: SnackbarState = {
  open: false,
  message: '',
  severity: 'success'
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setSnackbarMessage(
      state,
      action: PayloadAction<{ message: string; severity: SnackbarState['severity'] }>
    ) {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    closeSnackbar(state) {
      state.open = false;
    }
  }
});

export const { setSnackbarMessage, closeSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;

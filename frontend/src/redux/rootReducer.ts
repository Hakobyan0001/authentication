import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import homeReducer from './slices/homeSlice';
import loginReducer from './slices/loginSlice';
import registerReducer from './slices/registerSlice';
import resetPasswordReducer from './slices/resetPasswordSlice';
import setPasswordReducer from './slices/setPasswordSlice';
import snackBarReducer from './slices/SnackBarSlice';
const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  resetPassword: resetPasswordReducer,
  setPassword: setPasswordReducer,
  auth: authReducer,
  snackBar: snackBarReducer,
  home: homeReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

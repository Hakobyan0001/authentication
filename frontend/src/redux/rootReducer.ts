import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './slices/loginSlice';
import registerReducer from './slices/registerSlice';
import resetPasswordReducer from './slices/resetPasswordSlice';

const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  resetPassword: resetPasswordReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import loginReducer from './slices/loginSlice';
import registerReducer from './slices/registerSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  login: loginReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

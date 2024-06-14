import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './slices/loginSlice';
import registerReducer from './slices/registerSlice';

const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

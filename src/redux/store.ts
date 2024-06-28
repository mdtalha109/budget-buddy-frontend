import { configureStore } from '@reduxjs/toolkit';
import authReducer, { AuthState } from './authSlice';
import userSlice, {UserState} from './userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userSlice
  },
});

export type RootState = {
  auth: AuthState;
  user: UserState
};

export type AppDispatch = typeof store.dispatch;

export default store;

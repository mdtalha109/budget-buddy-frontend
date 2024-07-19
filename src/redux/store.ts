import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import authReducer, { AuthState } from './authSlice';
import userSlice, {UserState} from './userSlice';
import expenseSlice, {ExpenseState} from './expenseSlice';
import incomeSlice from './incomeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userSlice,
    expense: expenseSlice,
    income: incomeSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;

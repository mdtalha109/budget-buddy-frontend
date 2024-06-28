import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  name: string | null;
  email: string | null;
}

const initialState: UserState = {
  name: localStorage.getItem('userName'),
  email: localStorage.getItem('userEmail'),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ name: string; email: string }>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      localStorage.setItem('userName', action.payload.name);
      localStorage.setItem('userEmail', action.payload.email);
    },
    clearUser: (state) => {
      state.name = null;
      state.email = null;
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

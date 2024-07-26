import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import client from '../apolloClient';
import { USER_MUTATION } from '../graphql/user/mutation';
import graphqlResponseSerializer from '../utils/graphqlResponseSerializer';

export interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
}

const USER_STORAGE_KEY = 'budget-buddy-auth';

const initialState: UserState = (() => {
  const storedUser = localStorage.getItem(USER_STORAGE_KEY);
  return storedUser ? JSON.parse(storedUser) : { id: null, name: null, email: null };
})();

export interface UpdateUserArg {
  id: string;
  username?: string;
  email?: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  password?: string;
}



export const updateUser = createAsyncThunk<any, any, { rejectValue: string }>(
  'auth/updateUserProfile',
  async ({ id, username }: Partial<User>, { rejectWithValue }) => {
    try {
     
      const variables = { id, name:username };
      let  updatedData = await client.mutate({ mutation: USER_MUTATION, variables });
      let {data, message, success} = graphqlResponseSerializer(updatedData, 'updateUser')

      return { user: data, message };
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ id: string; name: string; email: string }>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(state));
    },
    clearUser: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      localStorage.removeItem(USER_STORAGE_KEY);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {

      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<any>) => {
        console.log("action: ", action)
        state.name = action.payload.user.name;
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(state));
      })
      .addCase(updateUser.rejected, (state, action) => {

      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

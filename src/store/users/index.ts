import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { signIn, createAccount, signOut, confirmAccount } from './thunks';

export type UserType = {
  id: string;
  phone: string;
  first_name: string;
  last_name: string;
  created_at: Date;
  updated_at: Date;
  cognito_sub: string;
  id_token: any;
  access_token: any;
  refresh_token: any;
};

interface UserState {
  activeUsers: UserType[] | null;
  activeUser: UserType | null;
  userLoading: boolean;
}

export const usersAdapter = createEntityAdapter<UserType>();

const initialState: UserState = {
  activeUsers: null,
  activeUser: null,
  userLoading: false,
};
usersAdapter.getInitialState({
  userLoading: false,
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setActiveUser(state, action: PayloadAction<UserType[]>) {
      state.activeUsers = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(signIn.pending, state => {
      state.userLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.activeUser = action.payload;
      state.userLoading = false;
    });
    builder.addCase(signIn.rejected, state => {
      console.log('hi');
      state.userLoading = false;
    });
    builder.addCase(signOut.fulfilled, (state, action) => {
      state.activeUser = null;
    });
    builder.addCase(signOut.rejected, state => {
      console.log('FAILED');
    });
    builder.addCase(createAccount.pending, state => {
      state.userLoading = true;
    });
    builder.addCase(createAccount.fulfilled, (state, action) => {
      state.userLoading = false;
    });
    builder.addCase(createAccount.rejected, state => {
      state.userLoading = false;
    });
    builder.addCase(confirmAccount.pending, state => {
      state.userLoading = true;
    });
    builder.addCase(confirmAccount.fulfilled, (state, action) => {
      state.userLoading = false;
      state.activeUser = action.payload;
    });
    builder.addCase(confirmAccount.rejected, state => {
      state.userLoading = false;
    });
  },
});

export default usersSlice.reducer;

/*

initialState NOTE
The initial state value for this slice of state.

This may also be a "lazy initializer" function, which should return an initial state value when called. This will be used whenever the reducer is called with undefined as its state value, and is primarily useful for cases like reading initial state from localStorage.
*/

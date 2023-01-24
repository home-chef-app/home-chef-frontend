import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { fetchActiveUser, signIn, signOut } from './thunks';

export type UserType = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
};

interface UserState {
  activeUsers: UserType[] | null;
  activeUser: UserType | null;
  signInLoading: boolean;
}

export const usersAdapter = createEntityAdapter<UserType>();

const initialState: UserState = {
  activeUsers: null,
  activeUser: null,
  signInLoading: false,
};
usersAdapter.getInitialState({
  signInLoading: false,
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
    builder.addCase(fetchActiveUser.pending, state => {
      console.log('PENDING', state);
    });
    builder.addCase(fetchActiveUser.fulfilled, (state, action) => {
      console.log('SUCESS', action.payload);
      state.activeUsers = action.payload;
    });
    builder.addCase(fetchActiveUser.rejected, state => {
      console.log('FAILED');
    });
    builder.addCase(signIn.pending, state => {
      state.signInLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      console.log('SUCESS', action.payload);
      state.activeUser = action.payload;
      state.signInLoading = false;
    });
    builder.addCase(signIn.rejected, state => {
      console.log('FAILED');
      state.signInLoading = false;
    });
    builder.addCase(signOut.fulfilled, (state, action) => {
      state.activeUser = null;
    });
    builder.addCase(signOut.rejected, state => {
      console.log('FAILED');
    });
  },
});

export default usersSlice.reducer;

/*

initialState NOTE
The initial state value for this slice of state.

This may also be a "lazy initializer" function, which should return an initial state value when called. This will be used whenever the reducer is called with undefined as its state value, and is primarily useful for cases like reading initial state from localStorage.
*/

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { fetchActiveUser } from './thunks';

export type UserType = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
};

interface UserState {
  activeUser: UserType | null;
}

export const usersAdapter = createEntityAdapter<UserType>();

const initialState: UserState = {
  activeUser: null,
};
usersAdapter.getInitialState({
  example: false,
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchActiveUser.pending, state => {
      console.log('PENDING', state);
    });
    builder.addCase(fetchActiveUser.fulfilled, (state, action) => {
      console.log('SUCESS', action.payload);
      state.activeUser = action.payload;
    });
    builder.addCase(fetchActiveUser.rejected, state => {
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

import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
} from '@reduxjs/toolkit';

import { setLoading } from '../appState';

export const fetchActiveUser = createAsyncThunk(
  'users/fetchActiveUser',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    // Call async API request
    return {
      first_name: 'Evan',
      last_name: 'Larkin',
      id: 'uuid',
      email: 'elarkin@mail.com',
    };
  },
);

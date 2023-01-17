import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
} from '@reduxjs/toolkit';

import { setLoading } from '../appState';
import { get } from '../../services/apiBaseService';

export const fetchActiveUser = createAsyncThunk(
  'users/fetchActiveUser',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const res = await get('users');
    thunkAPI.dispatch(setLoading(false));
    return res;
  },
);

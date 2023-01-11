import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
} from '@reduxjs/toolkit';

import { setLoading } from '../appState';

// Example of how to fetch sellers
export const fetchSellers = createAsyncThunk(
  'sellers/fetchSellers',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const response = await fetch('https://reqres.in/api/users?delay=1');
    return (await response.json()).data as any[];
  },
);

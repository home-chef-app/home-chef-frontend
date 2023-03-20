import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
} from '@reduxjs/toolkit';
import {SellerType} from '.';
import {get, post, put} from '../../services/apiBaseService';
import {setLoading} from '../appState';

// Example of how to fetch sellers
export const fetchSellers = createAsyncThunk(
  'sellers/fetchSellers',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const sellers: SellerType[] = await get('sellers');
    return sellers;
  },
);

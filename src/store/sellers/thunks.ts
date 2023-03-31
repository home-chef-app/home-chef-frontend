import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
} from '@reduxjs/toolkit';
import print from '@src/utils';
import {SellerType} from '.';
import {get, post, put} from '../../services/ApiBaseService';
import {setLoading} from '../appState';

// Example of how to fetch sellers
export const fetchSellers = createAsyncThunk(
  'sellers/fetchSellers',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const sellers: SellerType[] = await get('sellers');
    print(sellers);
    return sellers;
  },
);

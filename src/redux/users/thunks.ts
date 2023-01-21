import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
} from '@reduxjs/toolkit';
import { setLoading } from '../appState';
import { get } from '../../services/apiBaseService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchActiveUser = createAsyncThunk(
  'users/fetchActiveUser',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const res = await get('users');
    thunkAPI.dispatch(setLoading(false));
    return res;
  },
);

type SignInParams = {
  username: string;
  password: string;
};
export const signIn = createAsyncThunk(
  'users/signIn',
  async ({ username, password }: SignInParams, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    for (var i = 0; i < 10000; i++) {
      //kill time
    }
    // Call async API request
    await AsyncStorage.setItem('user_id', '123');
    return {
      first_name: 'Evan',
      last_name: 'Larkin',
      id: 'uuid',
      email: 'elarkin@mail.com',
    };
  },
);

export const signOut = createAsyncThunk(
  'users/signOut',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    await AsyncStorage.setItem('user_id', '');
    // Call async API request
    return true;
  },
);

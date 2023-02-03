import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
} from '@reduxjs/toolkit';
import { setLoading } from '../appState';
import { get, post } from '../../services/apiBaseService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType } from '.';

type SignInParams = {
  phone: string;
  password: string;
};
export const signIn = createAsyncThunk(
  'users/signIn',
  async ({ phone, password }: SignInParams, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    // Call async API request
    await AsyncStorage.setItem('user_id', '123');
    console.log('Signing in', phone, password);
    const result: UserType = await post('users/signin', {
      phone,
      password,
    });
    console.log('SIGN IN', result);
    return result;
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

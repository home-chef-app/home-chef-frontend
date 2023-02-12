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

type AuthParams = {
  phone: string;
  password: string;
  code?: string;
};
export const initUserSession = createAsyncThunk(
  'users/initUserSession',
  async () => {
    console.log('hi');
  },
);
export const signIn = createAsyncThunk(
  'users/signIn',
  async ({ phone, password }: AuthParams, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    // Call async API request
    await AsyncStorage.setItem('user_id', '123');
    const result: UserType = await post('users/signin', {
      phone,
      password,
    });
    console.log(result);
    return result;
  },
);

export const createAccount = createAsyncThunk(
  'users/createAccount',
  async ({ phone, password }: AuthParams, thunkAPI) => {
    // Call async API request
    console.log('create account:', phone, password);
    await AsyncStorage.setItem('user_id', '123');
    console.log('Create account', phone, password);
    const result: UserType = await post('users/signup', {
      phone,
      password,
    });
    console.log('CREATE ACCOUNT', result);
    return result;
  },
);

export const confirmAccount = createAsyncThunk(
  'users/confirmAccount',
  async ({ phone, password, code }: AuthParams, thunkAPI) => {
    // Call async API request
    console.log('confirm account:', phone, password, code);
    await AsyncStorage.setItem('user_id', '123');
    console.log('Create account', phone, password);
    const result: UserType = (await post('users/confirm', {
      first_name: 'Cormac',
      last_name: 'Stewart',
      phone,
      password,
      code,
    })) as UserType;
    console.log('CREATE ACCOUNT', result);
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

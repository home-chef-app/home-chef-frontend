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

    const result: UserType = await post('users/signin', {
      phone: '+19022130545',
      password: 'Homechef1',
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

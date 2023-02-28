import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
} from '@reduxjs/toolkit';
import {setLoading} from '../appState';
import {get, post, put} from '../../services/apiBaseService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setActiveUser, UserType} from '.';
import print from '@src/utils';
import EncryptedStorage from 'react-native-encrypted-storage';
import jwt_decode from 'jwt-decode';

type AuthParams = {
  phone: string;
  password: string;
  code?: string;
};
export const initUserSession = createAsyncThunk(
  'users/initUserSession',
  async (_, thunkAPI) => {
    const userString = await EncryptedStorage.getItem('userSession');
    if (userString) {
      const user = JSON.parse(userString);
      const {
        accessToken: {jwtToken},
        refreshToken: {token},
        phone,
      } = user;
      const {exp: tokenExpirationDate} = jwt_decode(jwtToken) as any;
      const now = Math.round(new Date().getTime() / 1000);
      if (now > tokenExpirationDate) {
        print('TOKEN IS EXPIRED, REFRESHING');
        // TODO hit new endpoint with refresh token to get new accessToken
        const response = await put('users/refreshIdToken', {
          phone,
          refreshToken: token,
        });

        const {result: idToken} = response;
        await EncryptedStorage.setItem(
          'userSession',
          JSON.stringify({
            ...user,
            accessToken: {
              jwtToken: idToken,
            },
          }),
        );
        print('TOKEN REFRESHED');
      }
      console.log(user);
      return user;
    }
    console.log('Null');
    thunkAPI.rejectWithValue(null);
  },
);
export const signIn = createAsyncThunk(
  'users/signIn',
  async ({phone, password}: AuthParams, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    // Call async API request
    const result: UserType = await post('users/signin', {
      phone,
      password,
    });
    console.log(result);
    await EncryptedStorage.setItem(
      'userSession',
      JSON.stringify({
        ...result,
      }),
    );
    return result;
  },
);

export const createAccount = createAsyncThunk(
  'users/createAccount',
  async ({phone, password}: AuthParams, thunkAPI) => {
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
  async ({phone, password, code}: AuthParams, thunkAPI) => {
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
    await EncryptedStorage.removeItem('userSession');
    return true;
  },
);

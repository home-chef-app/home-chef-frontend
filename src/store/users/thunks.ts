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
import {refreshAccessToken} from 'services/AuthService';

type AuthParams = {
  phone: string;
  password: string;
  code?: string;
};
export const initUserSession = createAsyncThunk(
  'users/initUserSession',
  async (_, thunkAPI) => {
    console.log('getting user');
    try {
      const userString = await EncryptedStorage.getItem('userSession');
      if (userString) {
        const user = JSON.parse(userString);
        const {access_token, refresh_token, phone} = user;
        console.log('checking token');
        console.log(access_token);
        const {exp: tokenExpirationDate} = jwt_decode(access_token) as any;
        console.log('token expiry: ', tokenExpirationDate);
        const now = Math.round(new Date().getTime() / 1000);
        if (now > tokenExpirationDate) {
          print('TOKEN IS EXPIRED, REFRESHING');
          // TODO hit new endpoint with refresh token to get new accessToken
          const accessToken = await refreshAccessToken(phone, refresh_token);
          const newUser = {
            ...user,
            access_token: accessToken,
          };
          await EncryptedStorage.setItem(
            'userSession',
            JSON.stringify(newUser),
          );
          print('TOKEN REFRESHED');
          return newUser;
        }
        return user;
      }
      console.log('Null');
      thunkAPI.rejectWithValue(null);
    } catch (e) {
      console.log(e);
      thunkAPI.rejectWithValue(null);
    }
  },
);
export const signIn = createAsyncThunk(
  'users/signIn',
  async ({phone, password}: AuthParams, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const {
      accessToken: {jwtToken: access_token},
      cognito_sub,
      createdAt: created_at,
      first_name,
      last_name,
      id,
      idToken: {jwtToken: id_token},
      refreshToken: {token: refresh_token},
      updatedAt: updated_at,
    } = await post(
      'users/signin',
      {
        phone,
        password,
      },
      false,
    );
    print('sign in success');
    const user = {
      id,
      phone,
      first_name,
      last_name,
      created_at,
      updated_at,
      cognito_sub,
      id_token,
      access_token,
      refresh_token,
    };
    await EncryptedStorage.setItem('userSession', JSON.stringify(user));
    print('user saved to storage');
    return user;
  },
);

export const createAccount = createAsyncThunk(
  'users/createAccount',
  async ({phone, password}: AuthParams, thunkAPI) => {
    // Call async API request
    console.log('create account:', phone, password);
    await AsyncStorage.setItem('user_id', '123');
    const result: UserType = await post(
      'users/signup',
      {
        phone,
        password,
      },
      false,
    );
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
    const {
      accessToken: {jwtToken: access_token},
      cognito_sub,
      createdAt: created_at,
      first_name,
      last_name,
      id,
      idToken: {jwtToken: id_token},
      refreshToken: {token: refresh_token},
      updatedAt: updated_at,
    } = await post(
      'users/confirm',
      {
        first_name: 'Cormac',
        last_name: 'Stewart',
        phone,
        password,
        code,
      },
      false,
    );
    print('confirm account success');
    const user = {
      id,
      phone,
      first_name,
      last_name,
      created_at,
      updated_at,
      cognito_sub,
      id_token,
      access_token,
      refresh_token,
    };
    await EncryptedStorage.setItem('userSession', JSON.stringify(user));
    print('user saved to storage');
    return user;
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

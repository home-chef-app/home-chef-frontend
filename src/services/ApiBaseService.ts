import config from '../config';
import {store} from 'store/store';
import print from '@src/utils';
import {refreshAccessToken} from './AuthService';
import {setUserAccessToken} from 'store/users';

const apiBaseUrl = `${config.API_BASE_URL}/${config.STAGE}/${config.API_VERSION}/`;

const getAccessToken = () => {
  const token = store.getState().users.activeUser?.access_token;
  if (!token) throw new Error('No access token');
  return token;
};

const tryRefreshToken = async () => {
  const user = store.getState().users.activeUser;
  if (!user) throw new Error('No user in state');
  const {phone, refresh_token} = user;
  console.log('403, refreshing token');
  const token = await refreshAccessToken(phone, refresh_token);
  if (!token) {
    // I dont think this is possible, but put incase
    throw new Error('Unauthorized');
  }
  store.dispatch(setUserAccessToken(token));
  return token;
};

// Helper class to make all requests to our api. We can customize as we find a cadence for how we hit our api.
// No try/catch blocks is intentional, this way we can catch all errors in redux and handle appropriately. Cormac, 2023-01-19
export const get = async (path: string, useToken = true, retries = 0) => {
  if (retries > 1) throw new Error('Could not refresh access token'); //refreshing token did not work
  console.log('GET: ', apiBaseUrl + path, retries);
  let token;
  if (useToken) token = getAccessToken();
  const resp = await fetch(apiBaseUrl + path, {
    method: 'GET',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      ...(useToken && {Authorization: `Bearer ${token ?? ''}`}),
    },
  });
  const respJson = await resp.json();
  const data = getReponseBody(respJson);
  if (!data) {
    // 403 response so retry with new token, will throw error if it fails
    await tryRefreshToken();
    await get(path, useToken, retries + 1);
  }
  return data;
};

export const put = async (
  path: string,
  body: any,
  useToken = true,
  retries = 0,
) => {
  if (retries > 1) throw new Error('Could not refresh access token');
  console.log('PUT: ', apiBaseUrl + path, retries);
  let token;
  if (useToken) token = getAccessToken();
  const resp = await fetch(apiBaseUrl + path, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      ...(useToken && {Authorization: `Bearer ${token ?? ''}`}),
    },
    body: JSON.stringify(body),
  });
  const respJson = await resp.json();
  const data = getReponseBody(respJson);
  if (!data) {
    // 403 response so retry with new token, will throw error if it fails
    await tryRefreshToken();
    await put(path, body, useToken, retries + 1);
  }
  return data;
};

export const post = async (
  path: string,
  body: any,
  useToken = true,
  retries = 0,
) => {
  if (retries > 1) throw new Error('Could not refresh access token');
  console.log('POST: ', apiBaseUrl + path, retries);
  console.log('body: ', body);
  let token;
  if (useToken) token = getAccessToken();
  const resp = await fetch(apiBaseUrl + path, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      ...(useToken && {Authorization: `Bearer ${token ?? ''}`}),
    },
    body: JSON.stringify(body),
  });
  const respJson = await resp.json();
  const data = getReponseBody(respJson);
  if (!data) {
    // 403 response so retry with new token, will throw error if it fails
    await tryRefreshToken();
    await post(path, body, useToken, retries + 1);
  }
  return data;
};

export const del = async (path: string, useToken = true, retries = 0) => {
  if (retries > 1) throw new Error('Could not refresh access token');
  console.log('PUT: ', apiBaseUrl + path, retries);
  let token;
  if (useToken) token = getAccessToken();
  const resp = await fetch(apiBaseUrl + path, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      ...(useToken && {Authorization: `Bearer ${token ?? ''}`}),
    },
  });
  const respJson = await resp.json();
  const data = getReponseBody(respJson);
  if (!data) {
    // 403 response so retry with new token, will throw error if it fails
    await tryRefreshToken();
    await del(path, useToken, retries + 1);
  }
  return data;
};

// Helper function to handle what we return for different cases. This is where we could
// even define our own error types to be thrown that could then invoke different actions
// in our redux.
const getReponseBody = (resp: any) => {
  switch (resp.status) {
    case 200: // ok
    case 201: // created
      return resp.data;
    case 204:
      return true; // no content
    case 403:
      return false; // unauthorized
    case 404: // this is where we could maybe throw different kinds of errors to be caught in our sagas
      throw new Error('Not found');
    case 500:
      throw new Error('Server error');
    default:
      return resp.data;
  }
};

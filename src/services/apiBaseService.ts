import {useSelector} from 'react-redux';
import {RootState} from 'store/store';
import config from '../config';

const apiBaseUrl = `${config.API_BASE_URL}/${config.STAGE}/${config.API_VERSION}/`;

const getAccessToken = () => {
  const activeUser = useSelector((state: RootState) => state.users.activeUser);
  return activeUser?.access_token ?? '';
};

// Helper class to make all requests to our api. We can customize as we find a cadence for how we hit our api.
// No try/catch blocks is intentional, this way we can catch all errors in redux and handle appropriately. Cormac, 2023-01-19
export const get = async (path: string, token?: string) => {
  console.log('GET: ', apiBaseUrl + path);
  console.log(token);
  // const token = getAccessToken();
  const resp = await fetch(apiBaseUrl + path, {
    method: 'GET',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token ?? ''}`,
    },
  });
  const respJson = await resp.json();
  const data = getReponseBody(respJson);
  return data;
};

export const put = async (path: string, body: any) => {
  console.log('PUT: ', apiBaseUrl + path);
  const resp = await fetch(apiBaseUrl + path, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const respJson = await resp.json();
  const data = getReponseBody(respJson);
  return data;
};

export const post = async (path: string, body: any) => {
  console.log('POST: ', apiBaseUrl + path);
  console.log('body: ', body);

  const resp = await fetch(apiBaseUrl + path, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const respJson = await resp.json();
  const data = getReponseBody(respJson);
  return data;
};

export const del = async (path: string) => {
  console.log('PUT: ', apiBaseUrl + path);

  const resp = await fetch(apiBaseUrl + path, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  });
  const respJson = await resp.json();
  const data = getReponseBody(respJson);
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
    case 404: // this is where we could maybe throw different kinds of errors to be caught in our sagas
      throw new Error('Not found');
    case 500:
      throw new Error('Server error');
    default:
      return resp.data;
  }
};

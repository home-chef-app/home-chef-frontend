import {put} from './ApiBaseService';

export const refreshAccessToken = async (
  phone: string,
  refreshToken: string,
) => {
  const response = await put(
    'users/refreshIdToken',
    {
      phone,
      refreshToken,
    },
    0,
    false,
  );
  const {result: accessToken} = response;
  return accessToken;
};

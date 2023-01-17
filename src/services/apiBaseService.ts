import config from '../config';

const apiBaseUrl = `${config.API_BASE_URL}/${config.STAGE}/${config.API_VERSION}/`;

export const get = async (path: string) => {
  console.log(apiBaseUrl + path);
  try {
    const resp = await fetch(apiBaseUrl + path, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    });
    const respJson = await resp.json();
    const data = getReponseBody(respJson);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getReponseBody = (resp: any) => {
  switch (resp.status) {
    case 200:
      return resp.data;
    default:
      return resp.data;
  }
};

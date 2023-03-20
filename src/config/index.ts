import {Platform} from 'react-native';
import {Config} from 'react-native-config';

const config = {
  STAGE: Config.STAGE,
  API_BASE_URL:
    Platform.OS == 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000',
  API_VERSION: Config.API_VERSION,
};

export default config;

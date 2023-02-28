import {Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

export const checkLocationPermissions = async () => {
  try {
    const result =
      Platform.OS == 'ios'
        ? await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        : await check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);

    switch (result) {
      case RESULTS.UNAVAILABLE:
        console.log(
          'This feature is not available (on this device / in this context)',
        );
        break;
      case RESULTS.DENIED:
        console.log(
          'The permission has not been requested / is denied but requestable',
        );
        await requestLocationPermissions();
        break;
      case RESULTS.LIMITED:
        console.log('The permission is limited: some actions are possible');
        break;
      case RESULTS.GRANTED:
        console.log('The permission is granted');
        break;
      case RESULTS.BLOCKED:
        console.log('The permission is denied and not requestable anymore');
        break;
    }
  } catch (e) {
    console.log(e);
  }
};

export const requestLocationPermissions = async () => {
  try {
    const result =
      Platform.OS == 'ios'
        ? await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        : await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);

    console.log(result);
  } catch (e) {
    console.log(e);
  }
};

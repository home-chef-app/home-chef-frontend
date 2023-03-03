import Geolocation from 'react-native-geolocation-service';

export function currentLocationCoordinates() {
  return new Promise(function (resolve, reject) {
    Geolocation.getCurrentPosition(
      position => {
        resolve(position);
      },
      error => {
        reject('Error');
      },
      {enableHighAccuracy: false, timeout: 5000, maximumAge: 10000},
    );
  });
}

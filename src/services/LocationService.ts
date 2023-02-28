import Geolocation from 'react-native-geolocation-service';

export function currentLocationCoordinates() {
  return new Promise(function (resolve, reject) {
    Geolocation.getCurrentPosition(
      position => {
        resolve(position);
      },
      error => {
        console.log(error.code, error.message);
        reject('Error');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  });
}

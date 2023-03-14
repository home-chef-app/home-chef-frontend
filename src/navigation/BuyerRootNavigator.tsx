import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTabs from './BuyerHomeTabs';
import { checkLocationPermissions } from 'services/PermissionService';
import { currentLocationCoordinates } from 'services/LocationService';
import { setUserLoc } from 'store/users';
import Spinner from 'components/common/FullPageLoader';
import { fetchSellers } from 'store/sellers/thunks';
import { useAppDispatch } from 'store/store';
const RootStack = createNativeStackNavigator();



function BuyerRootNavigator() {
  const [loading, setLoading] = useState(true)
  const dispatch = useAppDispatch();
  useEffect(() => {
    initBuyerSession().finally(() => { setLoading(false) })
  }, [])

  const initBuyerSession = async () => {
    try {
      //Fetch location
      await checkLocationPermissions()
      const result: any = await currentLocationCoordinates()
      if (result) {
        dispatch(setUserLoc({ lat: result.coords.latitude, lng: result.coords.longitude }))
      }

      //Fetch sellers
      dispatch(fetchSellers())
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <RootStack.Navigator>
        <RootStack.Screen
          name="BuyerHome"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>

    </>
  );
}
export default BuyerRootNavigator;


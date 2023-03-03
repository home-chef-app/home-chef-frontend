import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTabs from './BuyerHomeTabs';
import { checkLocationPermissions } from 'services/PermissionService';
import { currentLocationCoordinates } from 'services/LocationService';
import { useDispatch } from 'react-redux';
import { setUserLoc } from 'store/users';
import Spinner from 'components/common/FullPageLoader';
const RootStack = createNativeStackNavigator();



function BuyerRootNavigator() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    initBuyerSession().finally(() => { setLoading(false) })
  }, [])

  const initBuyerSession = async () => {
    try {
      await checkLocationPermissions()
      const result: any = await currentLocationCoordinates()
      if (result) {
        console.log(result.coords)
        dispatch(setUserLoc({ lat: result.coords.latitude, lng: result.coords.longitude }))
      }
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


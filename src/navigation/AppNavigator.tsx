import React, { useEffect, useRef, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthNav from './AuthNavigator';
import {
    isMountedRef,
    navigate,
    navigationRef,
} from '../services/NavigationService';
const Stack = createNativeStackNavigator();

import SellerRootNavigator from './SellerRootNavigator';
import BuyerRootNavigator from './BuyerRootNavigator';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

const AppNavigator = () => {
    const signedIn = false;
    const isSeller = false;
    const activeUser = useSelector((state: RootState) => state.users.activeUser);
    return (

        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
                {!activeUser && (
                    <Stack.Screen
                        name="Auth"
                        component={AuthNav}
                        options={{ headerShown: false, gestureEnabled: false }}
                    />
                )}
                {!!activeUser &&
                    (isSeller ? (
                        <Stack.Screen
                            name="Home"
                            component={SellerRootNavigator}
                            options={{ headerShown: false, gestureEnabled: false }}
                        />
                    ) : (
                        <Stack.Screen
                            name="Home"
                            component={BuyerRootNavigator}
                            options={{ headerShown: false, gestureEnabled: false }}
                        />
                    ))}
            </Stack.Navigator>
        </NavigationContainer>

    );
};
export default AppNavigator;

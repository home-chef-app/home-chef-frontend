import React from 'react';
import SignInScreen from '../screens/auth/SignIn';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function AuthNav() {
    return (
        <Stack.Navigator
            initialRouteName="Sign In"
            screenOptions={{ headerShown: false, gestureEnabled: false }}
        >
            <Stack.Screen name="Sign In" component={SignInScreen} />

        </Stack.Navigator>
    );
}

export default AuthNav;

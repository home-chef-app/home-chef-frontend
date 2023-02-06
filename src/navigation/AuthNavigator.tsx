import React from 'react';
import SignInScreen from '../screens/auth/SignIn';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateAccountScreen from 'screens/auth/CreateAccount';

const Stack = createNativeStackNavigator();

function AuthNav() {
  return (
    <Stack.Navigator
      initialRouteName="Sign In"
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="Sign In" component={SignInScreen} />
      <Stack.Screen name="Create Account" component={CreateAccountScreen} />
    </Stack.Navigator>
  );
}

export default AuthNav;

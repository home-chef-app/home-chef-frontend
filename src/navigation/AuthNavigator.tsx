import React from 'react';
import SignInScreen from '../screens/auth/SignIn';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateAccountScreen from 'screens/auth/CreateAccount';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

function AuthNav() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="Sign In"
        screenOptions={{ headerShown: false, gestureEnabled: false }}
      >
        <Stack.Screen name="Sign In" component={SignInScreen} />
        <Stack.Screen name="Create Account" component={CreateAccountScreen} />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

export default AuthNav;

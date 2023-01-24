import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTabs from './SellerHomeTabs';

const RootStack = createNativeStackNavigator();

function SellerRootNavigator() {
  return (
    <RootStack.Navigator >
      <RootStack.Screen
        name="SellerHome"
        component={HomeTabs}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
}
export default SellerRootNavigator;


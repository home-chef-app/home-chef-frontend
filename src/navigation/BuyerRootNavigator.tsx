import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTabs from './BuyerHomeTabs';

const RootStack = createNativeStackNavigator();

function BuyerRootNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="BuyerHome"
        component={HomeTabs}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
}
export default BuyerRootNavigator;


import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TestScreen from '../screens/TestScreen';

const Tab = createBottomTabNavigator();

function HomeTabs() {


  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
    >
      <Tab.Screen
        name="HomeTab"
        component={TestScreen}
      />
      <Tab.Screen
        name="Create"
        component={TestScreen}
      />
    </Tab.Navigator>
  );
}

export default HomeTabs;

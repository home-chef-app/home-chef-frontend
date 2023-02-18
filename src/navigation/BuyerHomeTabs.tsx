import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TestScreen from '../screens/TestScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

function HomeTabs() {

  return (
    <>
      <Tab.Navigator
        initialRouteName="HomeTab"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = 'home';
            console.log(route)
            if (route.name === 'HomeTab') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'History') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={25} color={color} />;
          },
          tabBarShowLabel: false,
          headerShown: false,
          tabBarLabel: "",
          tabBarActiveTintColor: colors.primary[500],
          tabBarInactiveTintColor: colors.dark[100],
          tabBarStyle: { height: 75 },
        })}

      >
        <Tab.Screen
          name="HomeTab"
          component={TestScreen}
        />
        <Tab.Screen
          name="History"
          component={TestScreen}
        />
      </Tab.Navigator>

    </>

  );
}

export default HomeTabs;

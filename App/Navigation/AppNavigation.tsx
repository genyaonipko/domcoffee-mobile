import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SignInScreen from '../Containers/SignInScreen';
import DashboardScreen from '../Containers/DashboardScreen';

const AppNavigator = createStackNavigator({
  SignIn: {
    screen: SignInScreen,
  },
  Dashboard: {
      screen: DashboardScreen,
  }
}, {
    headerMode: 'none',
});

export default createAppContainer(AppNavigator);
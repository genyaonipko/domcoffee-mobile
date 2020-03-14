import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SignInScreen from '../Containers/SignInScreen';
import DashboardScreen from '../Containers/DashboardScreen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import BottomNavigator from './BottomNavigator';

const PrimaryNav = createSwitchNavigator(
  {
    SignIn: {
      screen: SignInScreen,
    },
    Dashboard: {
      screen: BottomNavigator,
    },
  },
  {initialRouteName: 'SignIn'},
);

const AppNavigator = createStackNavigator(
  {
    Primary: {
      screen: PrimaryNav,
    },
  },
  {headerMode: 'none'},
);

export default AppNavigator;

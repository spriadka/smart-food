import React from 'react';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import SignInScreen from '../screens/SignInScreen';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

export default createAppContainer(createSwitchNavigator({
  Auth: SignInScreen,
  Main: MainTabNavigator,
  AuthLoading: AuthLoadingScreen,
  }, {
    initialRouteName: 'AuthLoading',
  }));
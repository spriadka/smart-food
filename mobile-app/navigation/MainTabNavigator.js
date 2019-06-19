import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ScannFoodScreen from '../screens/ScanFoodScreen';
import SettingsScreen from '../screens/SettingsScreen';

import Ionicons from '@expo/vector-icons/AntDesign';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const ScanFoodStack = createStackNavigator({
  ScanFood: ScannFoodScreen,
});

ScanFoodStack.navigationOptions = {
  tabBarLabel: 'Scan food',
  tabBarIcon: ({ focused }) => (
   <Ionicons name='qrcode' size={28} />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  ScanFoodStack
});

import React from 'react';

import {
  View,
  ActivityIndicator,
  StatusBar,
  StyleSheet
} from 'react-native';

import { AsyncStorage } from 'react-native';

export default class AuthLoadingScreen extends React.Component {

  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    console.log(userToken);
    this.props.navigation.navigate(userToken ? 'Main' : 'Auth');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
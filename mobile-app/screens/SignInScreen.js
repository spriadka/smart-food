import React from 'react';

import {
  View,
  ScrollView,
  Button,
  StyleSheet,
  AsyncStorage
} from 'react-native';

import { AuthSession, Font, AppLoading } from 'expo';

import axios from 'axios';

import { Root } from 'native-base';

import Config from '../config'

export default class SignInScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Button onPress={this.login} title="Login"></Button>
        </ScrollView>
      </View>
    )
  }

  login = async () => {
    let result = await AuthSession.startAsync({
      authUrl: Config.APP_ID.AUTHORIZATION_URL
    });
    const userInfo = await axios.get(Config.APP_ID.USER_INFO_URL, {
      headers: {
        "Authorization": `Bearer ${result.params.access_token}`
      }
    });
    await AsyncStorage.setItem('userToken', result.params.access_token);
    await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo.data));
    await this.props.navigation.navigate('Main');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
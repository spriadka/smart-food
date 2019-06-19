import React from 'react';

import { Permissions } from 'expo';

import Config from '../config';

import { StyleSheet,
  View,
  Platform,
  TouchableOpacity,
 } from 'react-native';

import { CameraKitCameraScreen } from 'react-native-camera-kit';

import axios from 'axios';

import {
  Content,
  Container,
  Text
} from 'native-base';

export default class ScanFoodScreen extends React.Component {
  constructor() {

    super();

    this.state = {

      QR_Code_Value: '',

      Start_Scanner: false,

    };
  }

  onQR_Code_Scan_Done = async (QR_Code) => {
    console.log(JSON.parse(QR_Code));
    this.setState({ QR_Code_Value: QR_Code });
    this.setState({ Start_Scanner: false });
    try {
      let response = await axios.post(Config.CLOUD_FUNCTIONS.CLOUDANT_BULK_URL,
      {
          "CLOUDANT_URL": Config.CLOUDANT.CLOUDANT_URL,
          "CLOUDANT_USERNAME": Config.CLOUDANT.CLOUDANT_USERNAME,
          "IAM_API_KEY":Config.CLOUDANT.IAM_API_KEY,
          "DATABASE_NAME":"sample-data",
          "ENTITIES": JSON.parse(QR_Code)
      });
    } catch (err) {
      throw err;
    }
    this.props.navigation.navigate('Home');
  }

  open_QR_Code_Scanner=()=> {

    var that = this;

    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const request = await Permissions.askAsync(Permissions.CAMERA);
          if (request.status === 'granted') {

            that.setState({ QR_Code_Value: '' });
            that.setState({ Start_Scanner: true });
          } else {
            alert("CAMERA permission denied");
          }
        } catch (err) {
          alert("Camera permission err", err);
          console.warn(err);
        }
      }
      requestCameraPermission();
    } else {
      that.setState({ QR_Code_Value: '' });
      that.setState({ Start_Scanner: true });
    }
  }
  render() {
    if (!this.state.Start_Scanner) {

      return (
        <View style={styles.MainContainer}>

          <Text style={{ fontSize: 22, textAlign: 'center' }}>Please scan your food here</Text>

          <TouchableOpacity
            onPress={this.open_QR_Code_Scanner}
            style={styles.button}>
            <Text style={{ color: '#FFF', fontSize: 14 }}>
              Open QR Scanner
            </Text>
          </TouchableOpacity>

        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>

        <CameraKitCameraScreen
          actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
          scanBarcode={true}
          colorForScannerFrame={'black'}
          onReadCode={event =>
            this.onQR_Code_Scan_Done(event.nativeEvent.codeStringValue)
          }
        />

      </View>
    );
  }
}
const styles = StyleSheet.create({

  MainContainer: {
    flex: 1,
    paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  QR_text: {
    color: '#000',
    fontSize: 19,
    padding: 8,
    marginTop: 12
  },
  button: {
    backgroundColor: '#2979FF',
    alignItems: 'center',
    padding: 12,
    width: 300,
    marginTop: 14
  },
});
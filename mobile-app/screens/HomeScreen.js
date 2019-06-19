import React from 'react';
import {
  StyleSheet,
  AsyncStorage,
  ListView
} from 'react-native';

import { Push } from 'bmd-push-react-native';

import { DeviceEventEmitter } from 'react-native';

import Config from '../config';

import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Thumbnail,
  Body,
  Title } from 'native-base';

import Moment from 'moment';

import axios from 'axios'

export default class HomeScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      data: [],
      userInfo: {}
     };
    pushInit = async () => {
      let initMessage = await Push.init({
        "appGUID":Config.PUSH.APP_GUID,
        "clientSecret":Config.PUSH.CLIENT_SECRET,
        "region":Config.PUSH.REGION
      });
    };
    pushRegister = async () => {
      let userInfo = JSON.parse(await AsyncStorage.getItem("userInfo"))
      let registerMessage = await Push.register({
        userId: userInfo.email
      });
      alert(registerMessage);
    }
    pushInit().then(() => pushRegister());

    DeviceEventEmitter.addListener("onPushReceived", function(notification: Event) {
      alert(notification.message);
    }.bind(this));

    Push.registerNotificationsCallback("onPushReceived");
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  };

  static navigationOptions = {
    header: null,
  };

  _deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.data];
    newData.splice(rowId, 1);
    this.setState({ data: newData });
  }

  async componentDidMount() {
    let userInfo = await AsyncStorage.getItem('userInfo');
    this.setState({userInfo: JSON.parse(userInfo)});
    try {
      let response = await axios.post(Config.CLOUD_FUNCTIONS.CLOUDANT_FIND_URL,
      {
          "CLOUDANT_URL": Config.CLOUDANT.CLOUDANT_URL,
          "CLOUDANT_USERNAME": Config.CLOUDANT.CLOUDANT_USERNAME,
          "IAM_API_KEY": Config.CLOUDANT.IAM_API_KEY,
          "DATABASE_NAME":"sample-data",
          "QUERY": {
              "selector": {
                  "user_email": Config.CLOUDANT.USER_EMAIL
              },
              "sort": [{
                  "data.name:string": "asc"
              }]
          }
      });
      this.setState({data: response.data.docs});
      this.fetchNotifications();
    } catch (err) {
        throw err;
    }
  }

  fetchNotifications = async () => {

    const DateDiff = {

      inDays: function(d1, d2) {
          var t2 = d2.getTime();
          var t1 = d1.getTime();

          return parseInt((t2-t1)/(24*3600*1000));
      },

      inWeeks: function(d1, d2) {
          var t2 = d2.getTime();
          var t1 = d1.getTime();

          return parseInt((t2-t1)/(24*3600*1000*7));
      },

      inMonths: function(d1, d2) {
          var d1Y = d1.getFullYear();
          var d2Y = d2.getFullYear();
          var d1M = d1.getMonth();
          var d2M = d2.getMonth();

          return (d2M+12*d2Y)-(d1M+12*d1Y);
      },

      inYears: function(d1, d2) {
          return d2.getFullYear()-d1.getFullYear();
      }
    };
      let foodToBeNotified = this.state.data.filter(data => {
          console.log(data);
          return DateDiff.inDays(new Date(), new Date(data.data.expirationDate)) == 0;
      }).map(data => data.data.name);
      await axios.post(Config.CLOUD_FUNCTIONS.TRIGGER_PUSH_URL,
        {
          "DATE": Moment(new Date()).add(20,'s').toDate(),
          "TRIGGER_PAYLOAD":{
              "messageText":"Following food is close to its expire date: " + JSON.stringify(foodToBeNotified) + ", please consume it"
          },
          "ACTION": "push-notifications/send-message"
      });
  }

  async deleteFromDb(data) {
    console.log(data)
    let response = await axios.post(Config.CLOUD_FUNCTIONS.CLOUDANT_DELETE_URL,
      {
          "CLOUDANT_URL":Config.CLOUDANT.CLOUDANT_URL,
          "CLOUDANT_USERNAME": Config.CLOUDANT.CLOUDANT_USERNAME,
          "IAM_API_KEY": Config.CLOUDANT.IAM_API_KEY,
          "DATABASE_NAME":"sample-data",
          "DOC_ID":data._id,
          "DOC_REV":data._rev
      });
      console.log(response.data);
  }

  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return  (
      <Container>
        <Header>
          <Body>
            <Title>Your food</Title>
          </Body>
        </Header>
        <Content>
          <List
            rightOpenValue={-75}
            dataSource={ds.cloneWithRows(this.state.data)}
            renderRow={data =>
              <ListItem>
                <Left>
                  <Thumbnail source={{ uri: data.data.images[0] }} />
                </Left>
                <Body>
                  <Text> {data.data.name} </Text>
                </Body>
                <Right>
                  <Text note>{Moment(data.data.expirationDate).format('DD-MM-YYYY')}</Text>
                </Right>
              </ListItem>}
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full danger onPress={ async _ => {
                console.log("Deleting");
                await this.deleteFromDb(data);
                this._deleteRow(secId, rowId, rowMap)
              }}>
                <Icon active name="trash" />
              </Button>} />
      </Content>
    </Container>);
  }
}
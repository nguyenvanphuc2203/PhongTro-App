import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar
} from 'react-native';
import Maps from '../maps/maps';
import Tabnavigation from '../tabnavigation/tab';

export default class Home extends Component {
  constructor(props){
    super(props);
  }
  static navigationOptions = ({navigation}) => ({
    header: null,
  })
  render() {
    return (
      <View style ={{flex:1}}>
        <StatusBar
          translucent={true}   
          backgroundColor={'transparent'}
          barStyle="light-content"
        />
        <Tabnavigation/>
      </View>
    );
  }
}

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Image
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Maps from '../maps/maps';
import MapChothue from '../mapchothue/mapchothue';
import History from '../history/history';
import Profile from '../profile/profile'

import Icon from 'react-native-vector-icons/Ionicons';

export default class Tabnavigation extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        selectedTab : 'home'
    }
  }
  render() {
    return (
        <TabNavigator
            tabBarStyle={{ backgroundColor:'#e9ebee' }}
            tabBarShadowStyle={{ borderTopWidth: 0,marginBottom: 5 }}
         >
            <TabNavigator.Item
              selected={this.state.selectedTab === 'home'}
              title="Tìm Trọ"
              renderIcon={() =>  <Icon name="ios-home-outline" size={24} color="#3ab087" />}
              renderSelectedIcon={() =>  <Icon name="ios-home" size={24} color="#3ab087" />}
              onPress={() => this.setState({ selectedTab: 'home' })}>
              <Maps/>
            </TabNavigator.Item>
            <TabNavigator.Item
              selected={this.state.selectedTab === 'post'}
              title="Đăng Tin"
              renderIcon={() => <Icon name="ios-add-circle-outline" size={24} color="#3ab087" />}
              renderSelectedIcon={() => <Icon name="ios-add-circle" size={24} color="#3ab087" />}
              onPress={() => this.setState({ selectedTab: 'post' })}>
              <MapChothue/>
            </TabNavigator.Item>
            <TabNavigator.Item
              selected={this.state.selectedTab === 'history'}
              title="Lịch Sử"
              renderIcon={() => <Icon name="ios-alarm-outline" size={24} color="#3ab087" />}
              renderSelectedIcon={() => <Icon name="ios-alarm" size={24} color="#3ab087" />}
              badgeText="1"
              onPress={() => this.setState({ selectedTab: 'history' })}>
              <History/>
            </TabNavigator.Item>
            <TabNavigator.Item
              selected={this.state.selectedTab === 'profile'}
              title="Profile"
              renderIcon={() => <Icon name="ios-person-outline" size={24} color="#3ab087" />}
              renderSelectedIcon={() => <Icon name="ios-person" size={24} color="#3ab087" />}
              onPress={() => this.setState({ selectedTab: 'profile' })}>
              <Profile/>
            </TabNavigator.Item>
        </TabNavigator>
    );
  }
}

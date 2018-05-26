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
            tabBarStyle={{ backgroundColor:'#fff' }}
            tabBarShadowStyle={{ borderTopWidth: 0,elevation: 3,marginBottom: 5 }}
         >
            <TabNavigator.Item
              selected={this.state.selectedTab === 'home'}
              title="Tìm Trọ"
              renderIcon={() => <Image source={require('../images/home_green.png')} />}
              renderSelectedIcon={() => <Image source={require('../images/home_green.png')} />}
              onPress={() => this.setState({ selectedTab: 'home' })}>
              <Maps/>
            </TabNavigator.Item>
            <TabNavigator.Item
              selected={this.state.selectedTab === 'post'}
              title="Đăng Tin"
              renderIcon={() => <Image source={require('../images/add.png')} style={{width:24,height:24}}/>}
              renderSelectedIcon={() => <Image source={require('../images/add.png')} style={{width:24,height:24}} />}
              onPress={() => this.setState({ selectedTab: 'post' })}>
              <MapChothue/>
            </TabNavigator.Item>
            <TabNavigator.Item
              selected={this.state.selectedTab === 'history'}
              title="Lịch Sử"
              renderIcon={() => <Image source={require('../images/history.png')} style={{width:24,height:24}}/>}
              renderSelectedIcon={() => <Image source={require('../images/history.png')} style={{width:24,height:24}}/>}
              badgeText="1"
              onPress={() => this.setState({ selectedTab: 'history' })}>
              <History/>
            </TabNavigator.Item>
            <TabNavigator.Item
              selected={this.state.selectedTab === 'profile'}
              title="Profile"
              renderIcon={() => <Image source={require('../images/profile_white.png')} />}
              renderSelectedIcon={() => <Image source={require('../images/profile_green.png')} />}
              onPress={() => this.setState({ selectedTab: 'profile' })}>
              <Profile/>
            </TabNavigator.Item>
        </TabNavigator>
    );
  }
}

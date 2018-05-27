import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './components/store/store';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import Home from './components/home/home';
import Detail from './components/maps/detail';
import Wellcome from './components/wellcome/wellcome';
import Formchothue from './components/mapchothue/formchothue';

/**
 * transaction route config 
 */
const transitionConfig = () => ({
  screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const { index } = scene;

      const translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [layout.initWidth, 0, 0]
      });

      const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index, index + 0.99, index + 1],
          outputRange: [0, 1, 1, 0.3, 0]
      });

      return { opacity, transform: [{ translateX }] }
  }
})


export default class App extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <Provider store={store} >
        <Router>
          <Scene key="root"
          >
            <Scene key="Wellcome"
              component={Wellcome}
              title="Wellcome"
              initial 
            />
            <Scene key="Home"
              component={Home}
              title="Home"
              type="reset" 
            />
            <Scene key="Detail"
              component={Detail}
              title="Chi Tiết"
            />
            <Scene key="Formchothue"
              component={Formchothue}
              title="form Cho Thuê"
            />
          </Scene>
        </Router>
      </Provider>
    );
  }
}

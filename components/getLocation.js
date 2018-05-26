
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class GetLocation extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      initialPosition: 'unknown',
      lastPosition: 'unknown',
    }
  }
  watchID: ?number = null;
  componentDidMount(){
      navigator.geolocation.getCurrentPosition(
         (position) => {
            var lat = parseFloat(position.coords.latitude);
            var lon = parseFloat(position.coords.longitude);
            var initialPosition = {
              latitude: lat,
              longitude: lon
            };
            this.setState({ initialPosition:initialPosition })
         },
         (error) => {
          alert(error.message)
         },
         { enableHighAccuracy: true, timeout: 2000, maximumAge: 3600000 }

      )
      this.watchID = navigator.geolocation.watchPosition((position) => {
         const lastPosition = JSON.stringify(position);
         this.setState({ lastPosition });
      });
   }
   componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID);
   }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          lat : {this.state.initialPosition.latitude}
        </Text>
        <Text style={styles.welcome}>
          long : {this.state.initialPosition.longitude}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
  ToastAndroid
} from 'react-native';
import MapView,{ Marker,Callout, AnimatedRegion, Animated } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex:1,
    position:'relative'
  },
  map: {
    flex:1,
    ...StyleSheet.absoluteFillObject,
  },
});

export default class MapChoThue extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      initialPosition: {
        latitude: 15.9710189,
        longitude: 108.2293462,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      coordinate:{
        latitude: 0,
        longitude: 0,
      },
      data_maps:[]
    }
    ToastAndroid.show('Nhẫn giữ để pick vị trí !', ToastAndroid.SHORT);
  }
  getGPS(){
      navigator.geolocation.getCurrentPosition(
         (position) => {
            var initialPosition = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            };
            var coordinate = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }
            this.setState({ initialPosition:initialPosition })
            this.setState({ coordinate:coordinate })
         },
         (error) => {
          alert(error.message)
         },
         {enableHighAccuracy: false, timeout: 15000, maximumAge: 3600000}
         
      )

      ToastAndroid.show('Nhẫn giữ để pick vị trí !', ToastAndroid.SHORT);
    }
    componentWillMount() {
      fetch('https://phongtro-nodejs.herokuapp.com/maps')
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          this.setState({ data_maps: responseJson }) ;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  onDragEnd(e){
    this.setState({ coordinate: e.nativeEvent.coordinate});
    if (this.state.coordinate.latitude == 0)
      alert('Vị trí không khả dụng!')
    else
    Actions.Formchothue({location:this.state.coordinate})
  }
  render() {
    return (
      <View style ={styles.container}>
          <View style={{flexDirection:'row',width:'92%',flex:1,borderRadius:5,zIndex:1,top:25,left:15,position:'absolute',backgroundColor:'#fff'}}>
            <GooglePlacesAutocomplete
                placeholder='Nhập vị trí Nhà trọ của bạn hoặc định vị!'
                minLength={2}
                autoFocus={false}
                returnKeyType={'default'}
                fetchDetails={true}
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                  console.log(data, details.geometry.location);
                  let location = {
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                  }
                  this.setState({initialPosition:location})
                  ToastAndroid.show('Nhẫn giữ để pick vị trí !', ToastAndroid.SHORT);
                }}
                query={{
                  // available options: https://developers.google.com/places/web-service/autocomplete
                  key: 'AIzaSyAMou4mlBlqmGJ6coKJC0GlvT7NP3XYtb4',
                  language: 'en', // language of the results
                  types: '(cities)' // default: 'geocode'
                }}
                styles={{
                  container:{
                    backgroundColor: '#3ab087',
                    borderRadius:6
                  },
                  textInputContainer: {
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderTopWidth: 0,
                    borderBottomWidth:0
                  },
                  textInput: {
                    marginLeft: 6,
                    marginRight: 6,
                    height: 30,
                    color: '#5d5d5d',
                    fontSize: 16
                  },
                  loader:{
                    color: '#fff'
                  },
                  listView:{
                    backgroundColor: '#fff',
                    color: '#fff'
                  },
                  predefinedPlacesDescription: {
                    color: '#fff'
                  },
                }}
                currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                currentLocationLabel="Current location"
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GoogleReverseGeocodingQuery={{
                  // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }}
                GooglePlacesSearchQuery={{
                  // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                  rankby: 'distance',
                  types: 'food'
                }}
          
                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                />
          </View>
          <MapView
            style={styles.map}
            region={this.state.initialPosition}
          >
            <Marker draggable
              coordinate={this.state.initialPosition}
              image={require('../images/location_picker.png')}
              title='Nhấn Giữ Để Chọn'
              description='Drag to pick'
              onDragEnd={(e) => { this.onDragEnd(e) }}
            >
            </Marker>
          </MapView>
          <View  style={{position:'absolute',bottom:20,right:20}}>
            <TouchableOpacity style={{backgroundColor:'#fff',padding:3,borderRadius:25}} onPress={this.getGPS.bind(this)}>
              <Image source={require('../images/location.png')} style={{width:40,height:40}}/>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}

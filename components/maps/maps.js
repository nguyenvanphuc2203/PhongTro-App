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
  ActivityIndicator
} from 'react-native';
import MapView,{ Marker,Callout, AnimatedRegion, Animated } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';


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

export default class Maps extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      initialPosition: {
        latitude: 15.9920189,
        longitude: 108.2293462,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      coordinate:{
        latitude: 0,
        longitude: 0,
      },
      data_maps:[],
      loading:false
    }
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
    }
    componentWillMount() {
      fetch('https://phongtro-nodejs.herokuapp.com/maps')
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          this.setState({ data_maps: responseJson ,loading:true}) ;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  render() {
    if ( !this.state.loading ) return (
      <ActivityIndicator
        color='red'
        size='large'
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    )
    return (
      <View style ={styles.container}>
          <View style={{flexDirection:'row',width:'94%',flex:1,borderRadius:7,zIndex:1,top:25,left:15,position:'absolute',backgroundColor:'#fff'}}>
            <GooglePlacesAutocomplete
                placeholder='Nhập Quận/Phường Để Tìm!'
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
                    marginLeft: 0,
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
                    color: '#1faadb'
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
                renderLeftButton={()  => <Image source={require('../images/search.png')} style={{margin:7, width: 30, height: 30}}/>}
              />
          </View>
          <MapView
            style={styles.map}
            region={this.state.initialPosition}
          > 
            <Marker 
              coordinate={this.state.initialPosition}
              title='Vị Trí Cần tìm'
              description='tìm kiếm xung quanh'
              onDragEnd={(e) => this.setState({ coordinate: e.nativeEvent.coordinate })}
            >
            </Marker>
            <Marker 
              coordinate={this.state.coordinate}
              title='đây là vị trí của bạn'
              description='Định vị GPS'
              onDragEnd={(e) => this.setState({ coordinate: e.nativeEvent.coordinate })}
            >
            </Marker>

            {
              this.state.data_maps.map(item => 
                <Marker 
                  key={item._id}
                  coordinate={{latitude: item.lat, longitude: item.lng}}
                  image={{uri:'https://i.imgur.com/9G5JOp8.png',width:50,height:50}}
                  title='Phòng Trọ có gác lửng'
                  description='1.500.000đ'
                  onDragEnd={(e) => this.setState({ coordinate: e.nativeEvent.coordinate })}
                >
                  <Callout onPress={()=>{ Actions.Detail({title:item.title,id:item._id}) }}>
                      <View style={{backgroundColor:'#e9ebee'}}>
                        <Image source={{uri:item.thumbnail}} style={{width:200,height:100}}/>
                        <Text style={{width:200,marginTop:3,backgroundColor:'#fff'}}>{item.address}</Text>
                        <View style={{flex:1,flexDirection:'row',marginTop:3,backgroundColor:'#fff'}}>
                          <Text style={{color:'red',width:200}}>Giá/Tháng : {item.price} VNĐ</Text>
                        </View>
                        <View style={{flex:1,width:200,flexDirection:'row',marginTop:3,backgroundColor:'#fff'}}>
                          {
                              item.status ? 
                              <Text style={{marginTop:3,backgroundColor:'#fff',flex:8,alignItems:'flex-start',justifyContent:'center'}}><Icon name="ios-checkmark-circle-outline" size={20} color="green" /> Chưa Cho Thuê</Text> : 
                              <Text style={{marginTop:3,backgroundColor:'#fff',flex:8,alignItems:'flex-start',justifyContent:'center'}}><Icon name="ios-close-circle-outline" size={20} color="red" /> Đã Cho Thuê</Text>
                          }
                          <Text style={{flex:2,alignItems:'flex-end',width:200}}>{item.comments.length} <Icon name="ios-chatbubbles-outline" size={20} color="green" /></Text>
                        </View>
                        
                      </View>
                  </Callout>
                </Marker>
              )
            }
            
          </MapView>
          <View  style={{position:'absolute',bottom:40,right:20}}>
            <TouchableOpacity style={{backgroundColor:'#fff',padding:3,borderRadius:25}} onPress={this.getGPS.bind(this)}>
              <Image source={require('../images/location.png')} style={{width:40,height:40}}/>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}

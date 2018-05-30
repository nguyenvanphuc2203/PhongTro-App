import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
    Image,
    ScrollView,
    TextInput,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    ToastAndroid
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux'; // New code
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import TagInput from '@cutii/react-native-tag-input';

var ImagePicker = require('react-native-image-picker');
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

// More info on all the options is below in the README...just some common use cases shown here
var options = {
    title: 'Select Avatar',
    customButtons: [
      {name: 'fb', title: 'Choose Photo from Facebook'},
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };
class FormChoThue extends Component{
    constructor(props){
        super(props);
        this.state = {
            avatarSource: {uri:'https://i.imgur.com/XlYLI23.jpg'},
            data:{ thumbnail:'https://i.imgur.com/zGD4U5O.png' },
            address:'',
            loading:false,
            title:'',
            thumbnail:'https://i.imgur.com/XlYLI23.jpg',
            price:'',
            text:'Những Tiện ích',
            phone:'',
            tags:[],
            loading:false
        }
    }
    componentWillMount() {
        let { location } = this.props.navigation.state.params
        fetch('http://maps.googleapis.com/maps/api/geocode/json?latlng='+location.latitude+','+location.longitude+'&sensor=false')
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          if (responseJson.results.length == 0 ) {
              alert('Vị Trí Ko Tên')
              this.setState({address:'Vị Trí Không Xác Định Trên Bản Đồ!'})
          }else
          this.setState({address:responseJson.results[0].formatted_address})
        })
        .catch((error) => {
          console.error(error);
        });
    }
    static navigationOptions = () => ({
        header: null
    })
    chooseImage(){
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          else {
            let source = { uri: response.uri };
            let sourceBase64 = 'data:image/jpeg;base64,' + response.data
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            console.log(sourceBase64)
            this.setState({
              avatarSource: source
            });
            this.postFormDataToImgur(sourceBase64)
          }
        });
    }
    postFormDataToImgur(base64) {
        let clientId = '5afd6b67306a4cb';
        let clientSecret = "04608dcd172ef4ac90272149c4ed50f9f9f45f2f";
        let token = false;
        const formData = new FormData();
        formData.append('image', base64.split(',')[1])
        formData.append('type','base64')
        console.log(formData)
        let auth;
        if (token) {
          auth = 'Bearer ' + token;
        } else {
          auth = 'Client-ID ' + clientId;
        }
        this.setState({loading:true})
        fetch('https://api.imgur.com/3/image', {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: auth,
            Accept: 'application/json',
          },
        }).then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          this.setState({thumbnail:responseJson.data.link,loading:false})
          ToastAndroid.show('Upload ảnh thành công !', ToastAndroid.SHORT);
        })
        .catch((error) => {
          console.error(error);
        });;
      }
    postItem(){
        let { location } = this.props.navigation.state.params;
        this.setState({loading:true})
        if ( this.state.title != '' || this.state.price != '' || this.state.tags.length == 0 ) {
          // post data to server node 
          fetch('https://phongtro-nodejs.herokuapp.com/postitem', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              lat: location.latitude,
              lng: location.longitude,
              address:this.state.address,
              title: this.state.title,
              price: this.state.price,
              phone: this.state.phone,
              user_id:this.props.UserData.id,
              user_avatar: this.props.UserData.picture.data.url,
              status: true,
              thumbnail:this.state.thumbnail,
              service: this.state.tags,
              comments:[]
            }),
          }).then((response) => {
              this.setState({loading:false})
              ToastAndroid.show('Đăng tin thành công !', ToastAndroid.SHORT);
              Actions.Home()
          })
          .catch((error) => {
            console.log(error);
          });
          
        }else{
          alert('vui lòng điền đầy đủ thông tin !')
          this.setState({loading:false})
        }
        
      }
    render(){
        let avatar = this.state.avatarSource;
        if ( this.state.loading ) return (
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
        return( 
            <View style={style.main}>
                <View style={{height:50,flexDirection:"row",justifyContent:'center',backgroundColor:'#f1f8fe'}}>
                    <TouchableOpacity onPress={()=>{ Actions.pop()}} style={{flex:1,paddingLeft:10,justifyContent:'center'}} >
                        <Icon name="ios-arrow-round-back" size={40} color="red" />
                    </TouchableOpacity>
                    <View style={{flex:7,justifyContent:'center'}}> 
                        <Text numberOfLines={1} >Đăng tin cho thuê </Text>
                        <Text style={{color:'#333',fontSize:10}}>Vị Trí Hiện Tại </Text>
                    </View>
                    <View style={{flex:2,justifyContent:'center'}}> 
                    </View>
                </View>
                <View style={{flex:12/13}}>
                    <View>
                        <FormLabel>{this.state.address}</FormLabel>
                        <FormInput 
                            ref="title"
                            placeholder="Tiêu đề *"
                            onChangeText={(e)=>{this.setState({title:e})}}/>
                        <FormValidationMessage>{this.state.title == '' && 'This field is required'}</FormValidationMessage>
                        <FormInput 
                            ref="price"
                            placeholder="Giá/Tháng *"
                            onChangeText={(e)=>{this.setState({price:e})}}/>
                        <FormValidationMessage>{this.state.price == '' &&'This field is required'}</FormValidationMessage>
                        <FormInput 
                            ref="phone"
                            placeholder="Số Điện Thoại *"
                            onChangeText={(e)=>{this.setState({phone:e})}}/>
                        <FormValidationMessage>{this.state.phone == '' &&'This field is required'}</FormValidationMessage>
                        <View style={{width:'100%',height:60,paddingHorizontal:20}}>
                          <TagInput
                            tagContainerStyle={{padding:10}}
                            value={this.state.tags}
                            onChange={(tags) => this.setState({tags:tags })}
                            labelExtractor={(tag) => tag}
                            text={this.state.text}
                            onChangeText={(text) => this.setState({ text:text })}
                            inputDefaultWidth={100}
                          />
                        </View>

                        <FormValidationMessage>{this.state.tags.length == 0 &&'This field is required'}</FormValidationMessage>
                        <FormLabel>Chọn Một Bức Ảnh</FormLabel>
                        <View style={{padding:10}}>
                            <TouchableOpacity onPress={this.chooseImage.bind(this)}>
                            <Image
                                style={{width:'100%',height:170,borderRadius:10}}
                                source={avatar}
                            />
                            </TouchableOpacity>
                        </View>
                        <View style={{padding:10}}>
                            <Button onPress={this.postItem.bind(this)} title="Đăng Tin"  color="#689d3f" />
                        </View>
                    </View>
                </View>
            </View>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
      UserData:state.UserData,
    }
  }
  
export default connect(mapStateToProps)(FormChoThue)

const style = StyleSheet.create({
    main:{
        flex:1,
        flexDirection:'column'
    },
})
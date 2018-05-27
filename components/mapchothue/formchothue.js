import React, { Component } from 'react';
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
    ActivityIndicator
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux'; // New code
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');


export default class FormChoThue extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:{ thumbnail:'https://i.imgur.com/zGD4U5O.png' },
            address:'',
            loading:false,
            title:'',
            price:'',
            phone:'',
            service:[]
        }
    }
    componentWillMount() {
        let { location } = this.props.navigation.state.params
        fetch('http://maps.googleapis.com/maps/api/geocode/json?latlng='+location.latitude+','+location.longitude+'&sensor=false')
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          this.setState({address:responseJson.results[0].formatted_address})
        })
        .catch((error) => {
          console.error(error);
        });
    }
    static navigationOptions = () => ({
        header: null
    })
    render(){
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
                            onChangeText={()=>{this.setState({title:this.refs.title.value})}}/>
                        <FormValidationMessage>{this.state.title == '' && 'This field is required'}</FormValidationMessage>
                        <FormInput 
                            ref="price"
                            placeholder="Giá/Tháng *"
                            onChangeText={()=>{this.setState({price:this.refs.price.value})}}/>
                        <FormValidationMessage>{this.state.price == '' &&'This field is required'}</FormValidationMessage>
                        <FormInput 
                            ref="phone"
                            placeholder="Số Điện Thoại *"
                            onChangeText={()=>{this.setState({phone:this.refs.phone.value})}}/>
                        <FormValidationMessage>{this.state.phone == '' &&'This field is required'}</FormValidationMessage>
                        <FormInput 
                            ref="service"
                            placeholder="Dịch Vụ"
                            onChangeText={()=>{}}/>
                        <FormValidationMessage>{this.state.service.length == 0 &&'This field is required'}</FormValidationMessage>
                        <View style={{padding:10}}>
                            <Button title="Đăng Tin"  color="#689d3f" />
                        </View>
                    </View>
                </View>
            </View>
            
        )
    }
}


const style = StyleSheet.create({
    main:{
        flex:1,
        flexDirection:'column'
    },
})
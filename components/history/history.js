import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
    Image,
    ActivityIndicator
} from 'react-native';
import { ListItem } from 'react-native-elements'

class History extends Component{
    constructor(props){
        super(props);
        this.state = {
            historyData:[
                {
                    address: "22 cô giang, Ngũ Hành Sơn",
                    title: " Nhà Nguyên Căn",
                    price: "3.000.000",
                    phone: "0989080987",
                    user_id: "559506321087723",
                    status: true,
                    thumbnail: "https://i.imgur.com/zGD4U5O.png"
                }
            ],
            loading:false
        }
    }
    componentWillMount(){
        setTimeout(()=>{
          fetch('https://phongtro-nodejs.herokuapp.com/history/'+this.props.UserData.id)
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
            this.setState({historyData:responseJson,loading:true})
          })
          .catch((error) => {
            console.error(error);
          });
        },2000)
         
      }
    render(){
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
        if ( this.state.historyData.length == 0 )
        return (
            <View style={style.empty}>
                <Text>Bạn Chưa Đăng Tin Nào!</Text>
            </View>
        )
        else
        return (
            <View style={style.History}>
                {
                    this.state.historyData.map((l, i) => (
                    <ListItem
                        key={i}
                        leftAvatar={{ source: { uri: l.thumbnail } }}
                        title={l.title}
                        subtitle={l.address}
                    />
                    ))
                }
            </View>
            
        )
    }
}
const style = StyleSheet.create({
    empty:{
        flex:1,justifyContent:'center',
        alignItems:'center'
    },
    History:{
        backgroundColor:'#e9ebee',
    },
    itembox:{
        height:70,
        backgroundColor:'#fff',
        flex:1,
        flexDirection:'row'
    },
    item_image:{
        flex:2
    },
    item_content:{
        flex:8
    }
})
const mapStateToProps = (state) => {
    return {
      UserData:state.UserData,
    }
  }
  
export default connect(mapStateToProps)(History)
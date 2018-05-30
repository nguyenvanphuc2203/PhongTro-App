import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
    Image,
    ActivityIndicator,
    Alert,
    ToastAndroid,
    TouchableOpacity
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';

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
        this.getHistory()
    }
    getHistory(){
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
    changeStatus(id,status){
        var statusText = ''
        if ( !status ) statusText = 'Chưa cho thuê' ;
        else statusText = 'Đã cho thuê';
        Alert.alert(
            'Thông Báo',
            'Đánh dấu '+statusText,
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => {
                    this.setState({loading:true})
                    // post data to server node 
                    fetch('https://phongtro-nodejs.herokuapp.com/updatestatus', {
                        method: 'POST',
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                        id: id,
                        status: !status
                        }),
                    }).then((response) => {
                        this.setState({loading:false})
                        ToastAndroid.show('Thay đổi trạng thái thành công !', ToastAndroid.SHORT);
                        this.getHistory()
                    })
                    .catch((error) => {
                      console.log(error);
                    });;;
                    
                }},
            ],
            { cancelable: false }
          )
    }
    deleteHistory(id){
        Alert.alert(
            'Thông báo',
            'Bạn muốn xóa bài đăng này ?',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => {
                this.setState({loading:true})
                fetch('https://phongtro-nodejs.herokuapp.com/delete-history', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      id: id
                    }),
                  }).then((response) => {
                    this.setState({loading:false})
                    ToastAndroid.show('deleted !', ToastAndroid.SHORT);
                    this.getHistory()
                })
                .catch((error) => {
                  console.log(error);
                });;
                  
              }},
            ],
            { cancelable: false }
          )
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
                opacity: 0.5,
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
            <SwipeListView
                useFlatList
                data={this.state.historyData}
                disableRightSwipe={true}
                renderItem={ data => (
                    <View style={style.itembox}>
                        <View style={style.item_image}>
                            <Image source={{uri:data.item.thumbnail}} style={{width:60,height:50,borderRadius:5}} />
                        </View>
                        <View style={style.item_content}>
                            <Text  style={{color:'#333',marginTop:3}} numberOfLines={1}>{data.item.address}</Text>
                            <Text  style={{color:'red',marginTop:3}}>{data.item.price} VNĐ/THÁNG</Text>
                        </View>
                    </View>
                )}
                renderHiddenItem={ data => (
                    <View style={style.rowBack}>
                        <Text style={{flex:7.5}}></Text>
                        <View style={{flex:2.5,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <TouchableOpacity
                                style={{backgroundColor:'#3ab087',padding:10,borderRadius:4}} 
                                onPress={()=>{this.changeStatus(data.item._id,data.item.status)}}>
                                {
                                    data.item.status ? <Icon name="ios-close-circle" size={25} color="#fff" /> : <Icon name="ios-checkmark-circle" size={25} color="#fff" /> 
                                }
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{backgroundColor:'red',padding:10,borderRadius:2}} 
                                onPress={()=>{this.deleteHistory(data.item._id)}} >
                                <Icon name="md-trash" size={25} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                leftOpenValue={0}
                rightOpenValue={-90}
            />
            
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
        borderTopWidth:5,
        borderTopColor:'#e9ebee',
        height:70,
        flex:1,
        flexDirection:'row',
		backgroundColor: '#fff',
		justifyContent: 'center',
    },
    item_image:{
        flex:2,
        padding:10,
        marginLeft:10
    },
    item_content:{
        flex:8,
        padding:10,
        flexDirection:'column'
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#ccc',
        justifyContent: 'center',
        height: 70,
    },
    rowBack: {
        borderTopWidth:5,
        borderTopColor:'#e9ebee',
		alignItems: 'center',
		backgroundColor: '#fff',
		flex: 1,
        flexDirection: 'row',
        alignItems:'center',
		justifyContent: 'space-between',
		paddingLeft: 15,
	}
})
const mapStateToProps = (state) => {
    return {
      UserData:state.UserData,
    }
  }
  
export default connect(mapStateToProps)(History)
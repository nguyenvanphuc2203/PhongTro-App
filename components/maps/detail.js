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
    ToastAndroid,
    Keyboard
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux'; // New code
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

var USER_IMAGE='';
class Detail extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:{ thumbnail:'https://i.imgur.com/zGD4U5O.png' },
            loading:false
        }
        USER_IMAGE=this.props.UserData.picture.data.url;
    }
    componentWillMount() {
        fetch('https://phongtro-nodejs.herokuapp.com/finditem/'+this.props.navigation.state.params.id)
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
            this.setState({ data: responseJson[0], loading:true }) ;
          })
          .catch((error) => {
            console.error(error);
          });
    }
    static navigationOptions = () => ({
        header: null
    })
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
        return (
            <View style={style.main}>
                <View style={{height:50,flexDirection:"row",justifyContent:'center',backgroundColor:'#f1f8fe'}}>
                    <TouchableOpacity onPress={()=>{ Actions.pop()}} style={{flex:1,paddingLeft:10,justifyContent:'center'}} >
                        <Icon name="ios-arrow-round-back" size={40} color="red" />
                    </TouchableOpacity>
                    <View style={{flex:7,justifyContent:'center'}}> 
                        <Text>{this.props.navigation.state.params.title} </Text>
                        <Text style={{color:'#333',fontSize:10}}> 09:29</Text>
                    </View>
                    <View style={{flex:2,justifyContent:'center'}}>
                    </View>
                </View>
                <View style={{flex:12/13}}>
                    <View style={style.thumbnail}>
                        <Image
                            style={{width:'100%', height: '100%'}}
                            source={{uri: this.state.data.thumbnail}}
                        />
                    </View>
                    <View style={style.content}>
                        { this.state.loading && <TabContent  screenProps={{ content: this.state.data}}/> }
                    </View>
                </View>
                <View style={{flex:1/13}}>
                    <View style={style.action}>
                        <View style={{flex:1,padding:5}}>
                            <Button onPress={()=>{}} title="3.000.000 VNĐ" color="red"/>
                        </View>
                        <View style={{flex:1,padding:5}}>
                            <Button onPress={()=>{}} title="0964357189" color="#3ab087"/>
                        </View>
                        
                    </View>
                </View>
            </View>
        )
    }
}

class Infomation extends React.Component {
    constructor(props){
        super(props);
        
    }
    render() {
        console.log(this.props.content.service)
        return (
            <View style={{ flex: 1,}}>
                <View style={style.info}>
                    <Text> 
                        <Icon name="ios-pin" size={20} color="red" /> - { this.props.content.address}
                    </Text>
                </View>
                <View style={style.price}>
                    {
                        this.props.content.status ? 
                        <Text><Icon name="ios-checkmark-circle-outline" size={20} color="green" /> Chưa Cho Thuê</Text> : 
                        <Text><Icon name="ios-close-circle-outline" size={20} color="red" /> Đã Cho Thuê</Text>
                    }
                </View>
                <View style={style.service}>
                    <Text>Dịch Vụ</Text>
                </View>
                <ScrollView>
                    {   
                        this.props.content.service.map(item =>
                            <View key={item} style={style.service_item}>
                                <Text>{item}</Text>
                            </View>
                        )
                    }
                </ScrollView>
            </View>
      );
    }
}
  
class Comments extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text:'',
            comments:[]
        }
    }
    componentWillMount(){
        this.setState({comments:this.props.content.comments})
    }
    shouldComponentUpdate(){
        return true
    }
    postComment(){
        if (this.state.text != ''){
            fetch('https://phongtro-nodejs.herokuapp.com/addcomment', {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                id: this.props.content._id,
                user_image: USER_IMAGE,
                comment: this.state.text
                }),
            });
            ToastAndroid.show('Cảm ơn bạn đã phản hồi !', ToastAndroid.SHORT);
            this.state.comments.push({user_image: USER_IMAGE,comment: this.state.text})
            this.setState({
                text:'',
                comments:this.state.comments
            });
            Keyboard.dismiss()
        }else{
            ToastAndroid.show('Nhập bình luận !', ToastAndroid.SHORT);
        }
        
    }
    render() {
        console.log(this.props.content.comments)
        return (
            <View style={{ flex: 1 }}>
                <View style={style.input_comment}>
                    <View style={style.input_text}>
                    <FormInput 
                            value={this.state.text}
                            placeholder="Nhập đánh giá của bạn"
                            onChangeText={(e)=>{this.setState({text:e})}}/>
                    </View>
                    <View style={style.input_button}>
                        <Button onPress={this.postComment.bind(this)} color="#3ab087" title="send"/>
                    </View>
                </View>
                <ScrollView>
                    {   
                        this.state.comments.map(item =>
                            <View key={item.comment} style={style.comments}>
                                <View style={style.comment_image}>
                                    <Image source={{uri:item.user_image}} style={{width:50,height:50,borderRadius:25}} />
                                </View>
                                <View style={style.comment_text}>
                                    <Text>{item.comment}</Text>
                                </View>
                            </View>
                        )
                    }
                </ScrollView>
            </View>
        );
    }
}
  
const TabContent =  TabNavigator({
    'Thông Tin': { screen: props => <Infomation content={props.screenProps.content} /> },
    'Đánh Giá': { screen: props => <Comments content={props.screenProps.content} /> }
},{
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor:'#333',
      activeTabStyle: {
        color:"#333",
        backgroundColor: '#f1f8fe',
      },
      tabStyle: {
        height: 35, 
      },
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: '#f1f8fe',
      },
    },
    tabBarPosition: 'top'
});

const style = StyleSheet.create({
    main:{
        flex:1,
        flexDirection:'column'
    },
    thumbnail:{
        backgroundColor:'#333',
        flex: 3
    },
    content:{
        flex:7
    },
    action:{
        flex:1,
        flexDirection:'row'
    },
    info:{
        height: 40,
        marginTop:5,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'flex-start',
        paddingLeft:10
    },
    price:{
        height: 40,
        marginTop:5,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'flex-start',
        paddingLeft:10,
    },
    service:{
        height:40,
        paddingLeft:10,
        justifyContent:'center',
        alignItems:'flex-start',
    },
    service_item:{
        height: 50,
        marginTop:5,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'flex-start',
        paddingLeft:10
    },
    comments:{
        height: 60,
        marginTop:5,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'flex-start',
        paddingLeft:10,
        flexDirection:'row'
    },
    comment_image:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:5,
        paddingLeft:10,
    },
    comment_text:{
        flex:9,
        justifyContent:'center',
        padding:20
    },
    input_comment:{
        height: 40,
        marginTop:5,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'flex-start',
        padding:1,
        flexDirection:'row'
    },
    input_text:{
        flex:8
    },
    input_button:{
        flex:2
    }

})


const mapStateToProps = (state) => {
    return {
      UserData:state.UserData,
    }
  }
  
export default connect(mapStateToProps)(Detail)
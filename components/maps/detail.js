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
    TouchableOpacity
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');


export default class Detail extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:{ thumbnail:'https://i.imgur.com/zGD4U5O.png' },
            loading:false
        }
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
        return (
            <View style={style.main}>
                <View style={{flex:1/13,flexDirection:"row",justifyContent:'center',backgroundColor:'#f1f8fe'}}>
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
                    <Text>{this.props.content.address}</Text>
                </View>
                <View style={style.price}>
                    <Text>{this.props.content.price} VNĐ/THÁNG</Text>
                </View>
                <View style={style.service}>
                    <Text>Dịch Vụ</Text>
                </View>
                <ScrollView>
                    {   
                        this.props.content.service.map(item =>
                            <View key={item.id} style={style.service_item}>
                                <Text>{item.text}</Text>
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
            text:'Bình luận'
        }
    }
    render() {
        console.log(this.props.content.comments)
        return (
            <View style={{ flex: 1 }}>
                <View style={style.input_comment}>
                    <View style={style.input_text}>
                        <TextInput
                            style={{ width:'100%',height: 40, borderColor: '#333', borderWidth: 1}}
                            onChangeText={(text) => this.setState({text:text})}
                            placeholder="Nhập đánh giá của bạn!"
                        />
                    </View>
                    <View style={style.input_button}>
                        <Button color="blue" title="send"/>
                    </View>
                </View>
                <ScrollView>
                    {   
                        this.props.content.comments.map(item =>
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
      activeTintColor: '#fff',
      inactiveTintColor:'#fff',
      activeTabStyle: {
        color:"#fff",
        backgroundColor: '#689d3f',
      },
      tabStyle: {
        height: 35, 
      },
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: '#689d3f',
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
    info:{
        height: 40,
        marginTop:5,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'flex-start',
        paddingLeft:5
    },
    price:{
        height: 40,
        marginTop:5,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'flex-start',
        paddingLeft:4,
        borderLeftWidth:5,
        borderLeftColor:'red'
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
        flex:2,
        justifyContent:'center',
        alignItems:'center'
    },
    comment_text:{
        flex:8,
        justifyContent:'center',
        alignItems:'center'
    },
    input_comment:{
        height: 38,
        marginTop:5,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'flex-start',
        paddingLeft:5,
        flexDirection:'row'
    },
    input_text:{
        flex:8
    },
    input_button:{
        flex:2
    }

})
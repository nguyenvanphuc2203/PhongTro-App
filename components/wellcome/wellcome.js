import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  ActivityIndicator,
  AsyncStorage,
  StatusBar
} from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';
import FBLoginView from './FBLoginView';

class Wellcome extends Component{

  componentWillMount(){
    if( this.props.UserData.isLogin ) {
      Actions.Home()
    }
  }
  static navigationOptions = () => ({
    header: null
  })
  loginFacebook = (e)=>{ 
    let { dispatch } = this.props;
    dispatch({type:'LOGIN_SUCCESS',data: e.profile})
    console.log(e);
    console.log(this.props.UserData);
    // add database
    fetch('https://phongtro-nodejs.herokuapp.com/adduser', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: this.props.UserData,
      }),
    });
    Actions.Home()
  }
  render(){
    return (
      <View style={styles.login}>
        <StatusBar
          backgroundColor="#3ab087"
          barStyle="light-content"
        />
        <View style={{alignItems:'center'}}>
          <View style={{padding:20}}>
            <Image
              style={{width: 170, height: 140}}
              source={require('../images/logo1.png')}
            />
          </View>
          <FBLogin
            buttonView={<FBLoginView />}
            ref={(fbLogin) => { this.fbLogin = fbLogin }}
            loginBehavior={FBLoginManager.LoginBehaviors.Native}
            permissions={["email","user_friends"]}
            onLogin={this.loginFacebook.bind(this)}
            onLoginFound={function(e){console.log(e)}}
            onLoginNotFound={function(e){console.log(e)}}
            onLogout={function(e){console.log(e)}}
            onCancel={function(e){console.log(e)}}
            onPermissionsMissing={function(e){console.log(e)}}
          />
          {/* <ActivityIndicator size="large" color="blue" /> */}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    login:{
        flex:1,
        backgroundColor:'#3ab087',
        justifyContent:'center',
    },
})

const mapStateToProps = (state) => {
  return {
    UserData:state.UserData,
  }
}

export default connect(mapStateToProps)(Wellcome)
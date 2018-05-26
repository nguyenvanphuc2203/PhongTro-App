import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';


class FBLoginView extends Component {
    static contextTypes = {
      isLoggedIn: PropTypes.bool,
      login: PropTypes.func,
      logout: PropTypes.func,
      props: PropTypes.shape({})
    };

    constructor(props) {
        super(props);
    }

    render(){
        return (
          <View style={[]}>
          {( !this.context.isLoggedIn ) ? 
            <Icon.Button onPress={() => { this.context.login() }}
              color={"#fff"}
              backgroundColor={"#3d5898"} name={"facebook"}  size={20} borderRadius={100} >
              <View style={{alignItems:'center',padding:6}}>
                <Text style={{color:'#fff'}}> Login with Facebook</Text>
              </View>
            </Icon.Button>
            :
            <Icon.Button onPress={() => { this.context.logout() }}
              color={"#fff"}
              backgroundColor={"#3d5898"} name={"facebook"}  size={20} borderRadius={100} >
              <View style={{alignItems:'center',padding:6}}>
                <Text style={{color:'#fff'}}> Đăng Xuất </Text>
              </View>
            </Icon.Button>
          }
          </View>
      )
    }
}
export default FBLoginView;
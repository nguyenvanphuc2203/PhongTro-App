import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux'

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
        if ( !this.props.UserData.isLogin ) this.context.logout()
        return (
          <View style={[]}>
          {( !this.context.isLoggedIn ) ? 
            <Icon.Button onPress={() => { this.context.login() }}
              color={"#fff"}
              backgroundColor={"#3d5898"} name={"facebook"}  size={20} borderRadius={4} >
              <View style={{alignItems:'center',padding:6}}>
                <Text style={{color:'#fff'}}> Đăng nhập với Facebook</Text>
              </View>
            </Icon.Button>
            :
            // 
            <View></View>
          }
          </View>
      )
    }
}
const mapStateToProps = (state) => {
    return {
      UserData:state.UserData,
    }
  }
  
export default connect(mapStateToProps)(FBLoginView)
import { combineReducers } from 'redux';



const UserData = (state = {isLogin:false} ,action) => {
  switch(action.type) {
      case 'LOGIN_SUCCESS':
          return {...action.data,isLogin:true};
      case 'LOGOUT':
          return {...state,isLogin:false};
      default:
          return {isLogin:false}
  }
}


/* combineReducers */
export default rootReducer = combineReducers({UserData});
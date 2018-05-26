import { combineReducers,createStore } from 'redux';
import rootReducer from './reducer';

var store = createStore(rootReducer);
// end redux store
export default store;
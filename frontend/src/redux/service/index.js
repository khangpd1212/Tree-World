import { combineReducers } from 'redux'
import feeReducer from './fee';
import serviceReducer from './service';

export default combineReducers({
   feeReducer,
   serviceReducer,
})
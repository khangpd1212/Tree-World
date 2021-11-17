import { combineReducers } from 'redux'
import provinceReducer from './province'
import districtReducer from './district'
import wardReducer from './ward'

export default combineReducers({
   provinceReducer,
   districtReducer,
   wardReducer,
})
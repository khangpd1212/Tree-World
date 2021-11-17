import { combineReducers } from "redux";
import districtReducer from "./district";
import provinceReducer from "./province";
import wardReducer from "./ward";

export default combineReducers({
  provinceReducer,
  districtReducer,
  wardReducer,
});

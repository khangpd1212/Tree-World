import axios from "utils/axios";
import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { combineReducers } from "redux";
import districtReducer from "./district";
import provinceReducer from "./province";
import wardReducer from "./ward";

const initialState = {
  addressList: [],
  loading: "idle",
  error: "",
};

export const fetchAddress = createAsyncThunk(
  "POST_ALL_ADDRESS",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`address`,data)
      return await response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
)
export const getAddress = createAsyncThunk(
  "GET_ALL_ADDRESS",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`address`)
      return await response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
)
export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAddress.pending, (state) => {
      state.addressList = [];
      state.loading = "loading";
    });
    builder.addCase(getAddress.fulfilled, (state, action) => {
      state.addressList = action.payload;
      state.loading = "loaded";
    });
    builder.addCase(getAddress.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = "error";
    });
  },
})
export const selectAddress = (state) => state.addressState.addressReducer;
const addressReducer = addressSlice.reducer

export const { getAddressbyUser } = addressSlice.actions

export default combineReducers({
  provinceReducer,
  districtReducer,
  wardReducer,
  addressReducer
});
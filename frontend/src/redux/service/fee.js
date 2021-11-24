import axios from "../../utils/axios";


import {
   createSlice,
   createAsyncThunk,
   createSelector,
} from "@reduxjs/toolkit";

const initialState = {
   feeItems: [],
   loading: "idle",
   error: "",
};

export const fetchFee = createAsyncThunk(
   "GET_ALL_FEE",
   
   async(address, thunkAPI) => {
      try {
         const response = await axios.get("payment/fee",
           {
              params: {
                 to_district_id: address[0].district_id,
                 service_id: address[0].service_id,
                 to_ward_code: address[0].ward_code,
              }
         })
         return await response.data.data;
      } catch (error) {
         return thunkAPI.rejectWithValue({ error: error.message });
      }
   },
)

export const feeSlice = createSlice({
   name: "fee",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchFee.pending, (state) => {
         state.feeItems = [];
         state.loading = "loading";
      });
      builder.addCase(fetchFee.fulfilled, (state, action) => {
         state.feeItems = action.payload;
         state.loading = "loaded";
      });
      builder.addCase(fetchFee.rejected, (state, action) => {
         state.error = action.error.message;
         state.loading = "error";
      });
   },

})

export const selectFee = createSelector(
   (state) => ({
      feeItems: state.serviceState.feeReducer.feeItems,
      loading: state.serviceState.feeReducer.loading,
   }),
   (state) => state
);

export default feeSlice.reducer
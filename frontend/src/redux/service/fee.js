import axios from "../../utils/axios";


import {
   createSlice,
   createAsyncThunk,
   createSelector,
} from "@reduxjs/toolkit";

const initialState = {
   feeItems: 0,
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
                 to_district_id: address.district_id,
                 service_id: address.service_id ? address.service_id : '',
                 to_ward_code: address.ward_code,
              }
         })
         return await response.data.data.total;
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
         state.feeItems = 0;
         state.loading = "loading";
      });
      builder.addCase(fetchFee.fulfilled, (state, action) => {
         const feeRound =  Math.round(action.payload / 10000);
         state.feeItems = feeRound;
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
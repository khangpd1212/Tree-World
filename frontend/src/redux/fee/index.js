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
         const response = await axios.get("fee",
           {
              params: {
                 province: address[0].province,
                 district: address[0].district,
                 address: address[0].street,
                 ward: address[0].ward,
              }
         })
         return await response.data.fee;
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
      // textfee: state.feeState.textfee,
      feeItems: state.feeState.feeItems,
      loading: state.feeState.loading,
   }),
   (state) => state
);

// export const { showTextfee } = feeSlice.actions;

export default feeSlice.reducer
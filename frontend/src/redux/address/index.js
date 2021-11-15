import axios from "../../utils/axios";
import {
   createSlice,
   createAsyncThunk,
   createSelector,
} from "@reduxjs/toolkit";

const initialState = {
   textAddress: "",
   itemsAddress: [],
   loading: "idle",
   error: "",
};

export const fetchAddress = createAsyncThunk(
   "GET_ALL_ADDRESS",
   async (_, thunkAPI) => {
      try {
         const response = await axios.get("address/")
         return await response;
      } catch (error) {
         return thunkAPI.rejectWithValue({ error: error.message });
      }
   },
)

export const addressSlice = createSlice({
   name: "address/",
   initialState,
   reducers: {
      showTextAddress: (state, action) => {
         state.textAddress = action.payload
      }
   },
   extraReducers: (builder) => {
      builder.addCase(fetchAddress.pending, (state) => {
         state.itemsAddress = [];
         state.loading = "loading";
      });
      builder.addCase(fetchAddress.fulfilled, (state, action) => {
         state.itemsAddress = action.payload;
         state.loading = "loaded";
      });
      builder.addCase(fetchAddress.rejected, (state, action) => {
         state.error = action.error.message;
         state.loading = "error";
      });
   },

})

export const selectAddress= createSelector(
   (state) => ({
      textAddress: state.addressState.textAddress,
      itemsAddress: state.addressState.itemsAddress,
      loading: state.addressState.loading,
   }),
   (state) => state
);

export const { showTextAddress } = addressSlice.actions;

export default addressSlice.reducer
import axios from "utils/axios";


import {
   createSlice,
   createAsyncThunk,
   createSelector,
} from "@reduxjs/toolkit";

const initialState = {
   itemsDistrict: [],
   loading: "idle",
   error: "",
};

export const fetchDistrict = createAsyncThunk(
   "GET_ALL_DISTRICT",
   async (province_id, thunkAPI) => {
      try {
         const response = await axios.get(`payment/district/${province_id}`)
         return await response.data.data;
      } catch (error) {
         return thunkAPI.rejectWithValue({ error: error.message });
      }
   },
)

export const districtSlide = createSlice({
   name: "address/district",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchDistrict.pending, (state) => {
         state.itemsDistrict = [];
         state.loading = "loading";
      });
      builder.addCase(fetchDistrict.fulfilled, (state, action) => {
         state.itemsDistrict = action.payload;
         state.loading = "loaded";
      });
      builder.addCase(fetchDistrict.rejected, (state, action) => {
         state.error = action.error.message;
         state.loading = "error";
      });
   },
})

export const selectDistrict= createSelector(
   (state) => ({
      itemsDistrict: state.addressState.districtReducer.itemsDistrict,
      loading: state.addressState.districtReducer.loading,
   }),
   (state) => state
);

export default districtSlide.reducer
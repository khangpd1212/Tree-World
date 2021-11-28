import axios from "../../utils/axios";

import {
   createSlice,
   createAsyncThunk,
   createSelector,
} from "@reduxjs/toolkit";

const initialState = {
   serviceItems: [],
   loading: "idle",
   error: "",
};

export const fetchService = createAsyncThunk(
   "GET_ALL_SERVICE",
   async (district_id, thunkAPI) => {
      try {
         const response = await axios.get(`payment/service/${district_id}`,)
         return await response.data.data;
      } catch (error) {
         return thunkAPI.rejectWithValue({ error: error.message });
      }
   },
)

export const serviceSlice = createSlice({
   name: "service",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchService.pending, (state) => {
         state.serviceItems = [];
         state.loading = "loading";
      });
      builder.addCase(fetchService.fulfilled, (state, action) => {
         const payload = action.payload && action.payload.filter((service) => {
            return service ? service.short_name !== "" : []
        })
         state.serviceItems = payload;
         state.loading = "loaded";
      });
      builder.addCase(fetchService.rejected, (state, action) => {
         state.error = action.error.message;
         state.loading = "error";
      });
   },

})

export const selectService = createSelector(
   (state) => ({
      serviceItems: state.serviceState.serviceReducer.serviceItems,
      loading: state.serviceState.serviceReducer.loading,
   }),
   (state) => state
);

export default serviceSlice.reducer
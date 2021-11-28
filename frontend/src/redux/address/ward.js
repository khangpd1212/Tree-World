import axios from "utils/axios";
import {
   createSlice,
   createAsyncThunk,
   createSelector,
} from "@reduxjs/toolkit";

const initialState = {
   itemsWard: [],
   loading: "idle",
   error: "",
};

export const fetchWard = createAsyncThunk(
   "GET_ALL_WARD",
   async (district_id, thunkAPI) => {
      try {
         const response = await axios.get(`payment/ward/${district_id}`)
         return await response.data.data;
      } catch (error) {
         return thunkAPI.rejectWithValue({ error: error.message });
      }
   },
)
export const wardSlice = createSlice({
   name: "address/ward",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchWard.pending, (state) => {
         state.itemsWard = [];
         state.loading = "loading";
      });
      builder.addCase(fetchWard.fulfilled, (state, action) => {
         state.itemsWard = action.payload;
         state.loading = "loaded";
      });
      builder.addCase(fetchWard.rejected, (state, action) => {
         state.error = action.error.message;
         state.loading = "error";
      });
   },
})

export const selectWard = createSelector(
   (state) => ({
      itemsWard: state.addressState.wardReducer.itemsWard,
      loading: state.addressState.wardReducer.loading,
   }),
   (state) => state
);


export default wardSlice.reducer
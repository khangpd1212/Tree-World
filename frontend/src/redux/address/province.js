import axios from "utils/axios"
import {
   createSlice,
   createAsyncThunk,
   createSelector,
} from "@reduxjs/toolkit";

const initialState = {
   textAddress: localStorage.getItem("address") 
      ? JSON.parse(localStorage.getItem("address"))
   : {},
   itemsProvince: [],
   loading: "idle",
   error: "",
};

export const fetchProvince = createAsyncThunk(
   "GET_ALL_PROVINCE",
   async (_, thunkAPI) => {
      try {
         const response = await axios.get(`payment/province`)         
         return await response.data.data;
      } catch (error) {
         return thunkAPI.rejectWithValue({ error: error.message });
      }
   },
)
export const provinceSlice = createSlice({
   name: "address/province",
   initialState,
   reducers: {
      showTextAddress: (state, action) => {
         state.textAddress = action.payload
      },
      onRemoveAddress: (state) => {
        state.textAddress = {}
        localStorage.removeItem("address");
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchProvince.pending, (state) => {
         state.itemsProvince = [];
         state.loading = "loading";
      });
      builder.addCase(fetchProvince.fulfilled, (state, action) => {
         state.itemsProvince = action.payload;
         state.loading = "loaded";
      });
      builder.addCase(fetchProvince.rejected, (state, action) => {
         state.error = action.error.message;
         state.loading = "error";
      });
   },
})

export const selectProvince= createSelector(
   (state) => ({
      textAddress: state.addressState.provinceReducer.textAddress,
      itemsProvince: state.addressState.provinceReducer.itemsProvince,
      loading: state.addressState.provinceReducer.loading,
   }),
   (state) => state
);

export const { showTextAddress, onRemoveAddress } = provinceSlice.actions;

export default provinceSlice.reducer
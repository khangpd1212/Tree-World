import axios from "utils/axios";
import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
   orderList: []
}
export const fetchOrders = createAsyncThunk(
   "ORDER",
   async (data, thunkAPI) => {
      try {
         let token = localStorage.getItem("token");
         const response = await axios.post("order", data,
            {   
               headers: {
                  'Authorization': 'Bearer ' + token
               }
            }
         );
         toast.success(`You success order`, {
            position: "top-right",
         });
         return await response.data;
      } catch (error) {
         toast.error(`Error order`, {
            position: "top-right",
         });
         return thunkAPI.rejectWithValue({ error: error.message });
      }
   }
);
export const orderSlice = createSlice({
   name: "order",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchOrders.pending, (state) => {
         state.orderList = [];
         state.loading = "loading";
      });
      builder.addCase(fetchOrders.fulfilled, (state, action) => {
         state.orderList = action.payload;
         state.loading = "loaded";
      });
      builder.addCase(fetchOrders.rejected, (state, action) => {
         state.error = action.error.message;
         state.loading = "error";
      });
   },

})

export const selectOrders = (state) => state.orderState;

export default orderSlice.reducer;
import axios from "utils/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
   orderList: []
}
export const fetchOrders = createAsyncThunk(
   "POST_ORDER",
   async (data, thunkAPI) => {
      try {
         let token = localStorage.getItem("token");
         await axios.post("order", data[0],
            {
               headers: {
                  'Authorization': 'Bearer ' + token
               }
            }).then(res => {
               const id_order = res.data.order._id
               data[1].order_detail.map((item) => (
                  axios.post("order_detail", {
                     ...item,
                     id_order,
                  }, {
                     headers: {
                        'Authorization': 'Bearer ' + token
                     }
                  })
               ))
            })
         toast.success(`You success order`, {
            position: "bottom-left",
            autoClose: 2000,
         })
      } catch (error) {
         toast.error(`Error order`, {
            position: "bottom-left",
            autoClose: 2000,
         });
         return thunkAPI.rejectWithValue({ error: error.message });
      }
   }
);
export const getOrders = createAsyncThunk(
   "GET_ORDER",
   async (_, thunkAPI) => {
      try {
         const response = await axios.get("order");
         return await response.data;
      } catch (error) {
         return thunkAPI.rejectWithValue({ error: error.message });
      }
   }
);
export const orderSlice = createSlice({
   name: "order",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getOrders.pending, (state) => {
         state.orderList = [];
         state.loading = "loading";
      });
      builder.addCase(getOrders.fulfilled, (state, action) => {
         state.orderList = action.payload;
         state.loading = "loaded";
      });
      builder.addCase(getOrders.rejected, (state, action) => {
         state.error = action.error.message;
         state.loading = "error";
      });
   },

})

export const selectOrders = (state) => state.orderState;

export default orderSlice.reducer;
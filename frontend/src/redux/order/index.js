import axios from "utils/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
   orderList: [],
}
export const fetchOrders = createAsyncThunk(
   "POST_ORDER",
   async (data, thunkAPI) => {
      try {
         const postOrder = await axios.post("order", data[0]);
         const id_order = postOrder.data.order._id;
         const postOrderDetail = await data[1].map(item => (
            axios.post("order_detail", {
               id_order,
               ...item,
            })
         ));
         await Promise.all([postOrder, postOrderDetail])
         return id_order;
      } catch (error) {
         toast.error(`Error order`, {
            position: "bottom-left",
            autoClose: 2000,
         });
         return thunkAPI.rejectWithValue({ error: error.message });
      }
   }
);
export const fetchMomo = createAsyncThunk(
   "POST_MOMO",
   async (data, thunkAPI) => {
      try {
         const response = await axios.post("payment", data);
         return response.data.payUrl
      } catch (error) {
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
export const updateOrders = createAsyncThunk(
   "UPDATE_ORDER_STATUS",
   async (data, thunkAPI) => {
      try {
         let token = JSON.parse(localStorage.getItem("token"));
         await axios.put(`order/${data.id}`, { status: data.status }, {
            headers: {
             'Authorization': 'Bearer ' + token
            }
         });
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
export const { onStatusChange } = orderSlice.actions;
export default orderSlice.reducer;
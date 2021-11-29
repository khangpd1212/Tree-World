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
         await axios.post("order", data[0]).then(res => {
            const id_order = res.data.order._id
            data[1].map((item) => (
               axios.post("order_detail", {
                  ...item,
                  id_order,
               })
            ))
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
export const fetchMomo = createAsyncThunk(
   "POST_MOMO",
   async (data, thunkAPI) => {
      try {
         const response = await axios.post("order", data[0]).then(res => {
            const id_order = res.data.order._id
            data[1].map((item) => (
               axios.post("order_detail", {
                  id_order,
                  ...item,
               })
            ))
            const dataRes = axios.post("payment", {
               id_order,
               ...data[2],
            }).then(data => data.data.payUrl)
            return dataRes
         })
         return response
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
         let userItem = JSON.parse(localStorage.getItem("userItems"));
         await axios.put(`order/${data.id}`, { status: data.status }, {
            headers: {
               'Authorization': 'Bearer ' + userItem.accessToken
            }
         });
      } catch (error) {
         return thunkAPI.rejectWithValue({ error: error.message });
      }
   }
);
// Xóa order
export const deleteOrders = createAsyncThunk(
   "DELETE_ORDER",
   async (id, thunkAPI) => {
      try {
         let userItem = JSON.parse(localStorage.getItem("userItems"));
         const response = await axios.delete("order/" + id, {
            headers: {
               'Authorization': 'Bearer ' + userItem.accessToken
            }
         })
         return await response.data;
      } catch (error) {
         return thunkAPI.rejectWithValue({ error: error.message });
      }
   }
);
export const orderSlice = createSlice({
   name: "order",
   initialState,
   reducers: {
      onStatusChange: (state, action) => {
         const dataIndex = state.orderList.findIndex((item) => item._id === action.payload);
         console.log(state.orderList)
         const dataSplice = state.orderList.splice(dataIndex, 1);
         console.log(dataSplice)
         // state.orderList.push(dataSplice[0])
      }
   },
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
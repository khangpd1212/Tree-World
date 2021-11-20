import axios from "utils/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
  orderDetailList: [],
};
export const fetchOrderDetail = createAsyncThunk("POST_ORDER_DETAIL", async (data, thunkAPI) => {
  try {
    let token = localStorage.getItem("token");
    const response = await axios.post("order_detail", data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return await response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});
export const getOrderDetail = createAsyncThunk("GET_ORDER_DETAIL", async (_, thunkAPI) => {
  try {
    const response = await axios.get("order_detail");
    return await response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state) => {
      state.orderDetailList = [];
      state.loading = "loading";
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.orderDetailList = action.payload;
      state.loading = "loaded";
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = "error";
    });
  },
});

export const selectOrders = (state) => state.orderState;

export default orderSlice.reducer;

import axios from "utils/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  orderDetailList: [],
};
export const getOrderDetail = createAsyncThunk(
  "GET_ORDER_DETAIL",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("order_detail");
      return await response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const orderDetailSlice = createSlice({
  name: "order_detail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrderDetail.pending, (state) => {
      state.orderDetailList = [];
      state.loading = "loading";
    });
    builder.addCase(getOrderDetail.fulfilled, (state, action) => {
      state.orderDetailList = action.payload;
      state.loading = "loaded";
    });
    builder.addCase(getOrderDetail.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = "error";
    });
  },
});

export const selectOrderDetails = (state) => state.orderDetailState;

export default orderDetailSlice.reducer;

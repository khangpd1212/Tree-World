import axios from "../../utils/axios";
import useCallback from 'react';
import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  loading: "idle",
  error: "",
};

export const fetchProducts = createAsyncThunk(
  "GET_ALL_PRODUCTS",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("product/");
      return await response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.productList = [];
      state.loading = "loading";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.productList = action.payload;
      state.loading = "loaded";
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = "error";
    });
  },
});
export const selectProducts = createSelector(
  (state) => ({
    productList: state.productState.productList,
    loading: state.productState.loading,
  }),
  (state) => state
);

export default productSlice.reducer;

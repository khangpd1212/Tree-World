import axios from "../../utils/axios";
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
  async (options = {}, thunkAPI) => {
    try {
      let response;
      if (
        options &&
        Object.keys(options).length === 0 &&
        Object.getPrototypeOf(options) === Object.prototype
      ) {
        response = await axios.get("product/");
      } else {
        let text = "?";
        for (let i in options) {
          text += `${i}=${options[i]}&`;
        }
        let query = text.substring(0, text.length - 1);
        response = await axios.get(`product/${query}`);
      }

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

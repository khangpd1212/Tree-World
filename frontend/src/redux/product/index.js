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
  filterProduct: [],
  searchProduct: [],
  product: {},
};

export const fetchProducts = createAsyncThunk(
  "GET_ALL_PRODUCTS",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("product/");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const filterProducts = createAsyncThunk(
  "FILTER_PRODUCTS",
  async (options, thunkAPI) => {
    try {
      let text = "filter?";
      for (let i in options) {
        if (options[i] !== null) {
          text += `${i}=${options[i]}&`;
        }
      }
      let query = text.substring(0, text.length - 1);
      const response = await axios.get(`product/${query}`);
      console.log(query);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const searchProducts = createAsyncThunk(
  "SEARCH_PRODUCT",
  async (keyword, thunkAPI) => {
    try {
      const response = await axios.post(`product/search`, keyword);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const detailProduct = createAsyncThunk(
  "DETAIL_PRODUCT",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`product/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const viewProduct = createAsyncThunk("VIEW", async (id, thunkAPI) => {
  try {
    const response = await axios.get(`product/view?id=${id}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //FETCH
    builder.addCase(fetchProducts.pending, (state) => {
      return { ...state, loading: "loading" };
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      return { ...state, loading: "loaded", productList: action.payload };
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      return { ...state, loading: "error", error: action.error.message };
    });
    //FILTER
    builder.addCase(filterProducts.pending, (state) => {
      return { ...state, loading: "loading" };
    });
    builder.addCase(filterProducts.fulfilled, (state, action) => {
      return { ...state, loading: "loaded", filterProduct: action.payload };
    });
    builder.addCase(filterProducts.rejected, (state, action) => {
      return { ...state, loading: "error", error: action.error.message };
    });

    //SEARCH
    builder.addCase(searchProducts.pending, (state) => {
      return { ...state, loading: "loading" };
    });
    builder.addCase(searchProducts.fulfilled, (state, action) => {
      return { ...state, loading: "loaded", searchProduct: action.payload };
    });
    builder.addCase(searchProducts.rejected, (state, action) => {
      return { ...state, loading: "error", error: action.error.message };
    });
    //DETAIL
    builder.addCase(detailProduct.pending, (state) => {
      return { ...state, loading: "loading" };
    });
    builder.addCase(detailProduct.fulfilled, (state, action) => {
      return { ...state, product: action.payload, loading: "loaded" };
    });
    builder.addCase(detailProduct.rejected, (state, action) => {
      return { ...state, loading: "error", error: action.error.message };
    });
    //view
    builder.addCase(viewProduct.fulfilled, (state) => {
      return { ...state };
    });
  },
});
export const selectProducts = createSelector(
  (state) => ({
    productList: state.productState.productList,
    loading: state.productState.loading,
    filterProduct: state.productState.filterProduct,
    searchProduct: state.productState.searchProduct,
    product: state.productState.product,
  }),
  (state) => state
);

export default productSlice.reducer;

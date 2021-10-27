import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from '../../utils/axios';
import { requests } from '../../utils/requests';

export const fetchProducts = createAsyncThunk(
   'products/fetchProducts',
   async () => {
      const response = await axiosRequest("get", requests.fetAllProduct)
      return response;
   }
)

const productSlice = createSlice ({
   name: "products",
   initialState: {
      entities: [],
      loading: false,
      error: "",
   },
   extraReducers: {
      [fetchProducts.pending]: (state) => {
         state.loading = true;
      },
      [fetchProducts.rejected]: (state, action) => {
         state.loading = false;
         state.error = action.error;
      },
      [fetchProducts.fulfilled]: (state, action) => {
         state.loading = false;
         state.entities = action.payload;
      },
   }
})

const {reducer: productReducer} = productSlice;
export default productReducer;
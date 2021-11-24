import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  catalog: null,
  new: null,
  sales: null,
  hot: null,
  price: null,
  priceMin: null,
  priceMax: null,
  order: null,
  page: null,
};
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCatalog: (state, action) => {
      return { ...state, catalog: action.payload };
    },
    setNew: (state) => {
      return { ...state, new: true };
    },
    setHot: (state) => {
      return { ...state, hot: true, order: null, price: null, sales: null };
    },
    setBestSeller: (state) => {
      return { ...state, hot: null, order: null, price: null, sales: true };
    },
    sortPrice: (state, action) => {
      return {
        ...state,
        hot: null,
        order: action.payload,
        price: true,
        sales: null,
      };
    },
    sortDefault: (state) => {
      return { ...state, hot: null, order: null, price: null, sales: null };
    },
    setPrice: (state, action) => {
      return {
        ...state,
        priceMin: action.payload.priceMin,
        priceMax: action.payload.priceMax,
      };
    },
    setPage: (state, action) => {
      return { ...state, page: action.payload };
    },
    setDefault: (state) => {
      return {
        ...state,
        catalog: null,
        new: null,
        sales: null,
        hot: null,
        price: null,
        priceMin: null,
        priceMax: null,
        order: null,
        page: null,
      };
    },
  },
});

export const {
  setCatalog,
  setBestSeller,
  setHot,
  setNew,
  setPage,
  sortPrice,
  setPrice,
  setDefault,
  sortDefault,
} = filterSlice.actions;
export default filterSlice.reducer;

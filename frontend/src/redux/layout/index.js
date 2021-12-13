import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  layoutStatus: false,
  filterStatus: false,
  searchStatus: false,
  keyword: null,
  filterCmt: false,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setLayoutStatus: (state, action) => {
      state.layoutStatus = action.payload;
    },
    setFilterStatus: (state) => {
      return {
        ...state,
        filterStatus: true,
        searchStatus: false,
        keyword: null,
      };
    },
    setDefaultStatus: (state) => {
      return {
        ...state,
        filterStatus: false,
        searchStatus: false,
        keyword: null,
        filterCmt: false,
      };
    },
    setSearchStatus: (state, action) => {
      return {
        ...state,
        filterStatus: false,
        searchStatus: true,
        keyword: action.payload,
      };
    },
    setFilterCmt: (state) => {
      return { ...state, filterCmt: true };
    },
  },
});

export const {
  setLayoutStatus,
  setFilterStatus,
  setDefaultStatus,
  setSearchStatus,
  setFilterCmt,
} = layoutSlice.actions;
export default layoutSlice.reducer;

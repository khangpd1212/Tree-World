import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  layoutStatus: false,
  filterStatus: false,
  searchStatus: false,
  keyword: null,
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
  },
});

export const {
  setLayoutStatus,
  setFilterStatus,
  setDefaultStatus,
  setSearchStatus,
} = layoutSlice.actions;
export default layoutSlice.reducer;

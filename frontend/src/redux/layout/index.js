import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
const initialState = {
  layoutStatus: false,
  filterStatus: false,
  searchStatus: false,
  keyword: null,
  filterCmt: false,
  year: moment().format("YYYY"),
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
    setYear: (state, action) => {
      return { ...state, year: action.payload };
    },
  },
});

export const {
  setLayoutStatus,
  setFilterStatus,
  setDefaultStatus,
  setSearchStatus,
  setFilterCmt,
  setYear,
} = layoutSlice.actions;
export default layoutSlice.reducer;

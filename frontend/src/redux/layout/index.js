import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  layoutStatus: false,
  filterStatus: false,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setLayoutStatus: (state, action) => {
      state.layoutStatus = action.payload;
    },
    setFilterStatus: (state) => {
      return { ...state, filterStatus: true };
    },
    setDefaultStatus: (state) => {
      return { ...state, filterStatus: false };
    },
  },
});

export const { setLayoutStatus, setFilterStatus, setDefaultStatus } =
  layoutSlice.actions;
export default layoutSlice.reducer;

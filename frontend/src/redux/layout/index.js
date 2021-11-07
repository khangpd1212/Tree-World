import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  layoutStatus: false,
  urlStatus: {},
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setLayoutStatus: (state, action) => {
      state.layoutStatus = action.payload;
    },
    setUrlStatus: (state, action) => {
      state.urlStatus = { ...state.urlStatus, ...action.payload };
    },
  },
});

export const { setLayoutStatus, setUrlStatus } = layoutSlice.actions;
export default layoutSlice.reducer;

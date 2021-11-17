import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
   loginState: [],
   isShowLogin: false,
};

const loginSlice = createSlice({
   name: "login",
   initialState,
   reducers: {
      ShowModalLogin: (state, action) => {
         state.isShowLogin = action.payload;
      },
      onCancelLogin: (state, action) => {
         state.isShowLogin = action.payload;
      },
      onOkLogin: (state, action) => {
         state.isShowLogin = action.payload;
      },
      onLogin: (state, action) => {
         state.loginState = action.payload;

      }
   },
});

export const selectLogins = createSelector(
   (state) => ({
      isShowLogin: state.loginState.isShowLogin,
   }),
   (state) => state
);

export const { ShowModalLogin, onCancelLogin, onOkLogin, onLogin } = loginSlice.actions;
export default loginSlice.reducer;

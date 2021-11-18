import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
   isShowLogin: false,
   isShowSignUp: false,
};

const modalSlice = createSlice({
   name: "modal",
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
      ShowModalSignUp: (state, action) => {
         state.isShowSignUp = action.payload;
      },
      onCancelSignUp: (state, action) => {
         state.isShowSignUp = action.payload;
      },
      onOkSignUp: (state, action) => {
         state.isShowSignUp = action.payload;
      }
   },
});

export const selectModals = createSelector(
   (state) => ({
      isShowLogin: state.modalState.isShowLogin,
      isShowSignUp: state.modalState.isShowSignUp,
   }),
   (state) => state
);

export const { 
   ShowModalLogin, onCancelLogin, onOkLogin, ShowModalSignUp, onCancelSignUp, onOkSignUp 
} = modalSlice.actions;
export default modalSlice.reducer;

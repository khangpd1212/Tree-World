import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  isShowLogin: false,
  isShowSignUp: false,
  isShowDefaultAddress: false,
  isShowAddress: false
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    //  modal login
    ShowModalLogin: (state, action) => {
      state.isShowLogin = action.payload;
    },
    onCancelLogin: (state, action) => {
      state.isShowLogin = action.payload;
    },
    onOkLogin: (state, action) => {
      state.isShowLogin = action.payload;
    },
    // modal sign up
    ShowModalSignUp: (state, action) => {
      state.isShowSignUp = action.payload;
    },
    onCancelSignUp: (state, action) => {
      state.isShowSignUp = action.payload;
    },
    onOkSignUp: (state, action) => {
      state.isShowSignUp = action.payload;
    },
    // modal ađress
    ShowModalAddress: (state, action) => {
      state.isShowAddress = action.payload;
    },
    onCancelAddress: (state, action) => {
      state.isShowAddress = action.payload;
    },
    onOkAddress: (state, action) => {
      state.isShowAddress = action.payload;
    },
    // modal default address
    ShowModalDefaultAddress: (state, action) => {
      state.isShowDefaultAddress = action.payload;
    },
    onCancelDefaultAddress: (state, action) => {
      state.isShowDefaultAddress = action.payload;
    },
    onOkDefaultAddress: (state, action) => {
      state.isShowDefaultAddress = action.payload;
    }
  },
});

export const selectModals = createSelector(
  (state) => ({
    isShowLogin: state.modalState.isShowLogin,
    isShowSignUp: state.modalState.isShowSignUp,
    isShowAddress: state.modalState.isShowAddress,
    isShowDefaultAddress: state.modalState.isShowDefaultAddress,
  }),
  (state) => state
);


export const {
  ShowModalLogin, onCancelLogin, onOkLogin, ShowModalSignUp, onCancelSignUp, onOkSignUp, ShowModalAddress, onCancelAddress, onOkAddress, ShowModalDefaultAddress, onCancelDefaultAddress, onOkDefaultAddress
} = modalSlice.actions;
export default modalSlice.reducer;

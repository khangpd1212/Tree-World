import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  isShowLogin: false,
  isShowSignUp: false,
  isShowDefaultAddress: false,
  isShowAddress: false,
  isShowForget: false,
  isShowNewPass: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    //  modal login
    ShowModalLogin: (state, action) => {
      state.isShowLogin = action.payload;
    },

    // modal forget
    ShowModalForget: (state, action) => {
      state.isShowForget = action.payload;
    },

    // modal new password
    ShowModalNewPass: (state, action) => {
      state.isShowNewPass = action.payload;
    },

    // modal sign up
    ShowModalSignUp: (state, action) => {
      state.isShowSignUp = action.payload;
    },

    // modal ađress
    ShowModalAddress: (state, action) => {
      state.isShowAddress = action.payload;
    },

    // modal default address
    ShowModalDefaultAddress: (state, action) => {
      state.isShowDefaultAddress = action.payload;
    },
  },
});

export const selectModals = createSelector(
  (state) => ({
    isShowLogin: state.modalState.isShowLogin,
    isShowSignUp: state.modalState.isShowSignUp,
    isShowAddress: state.modalState.isShowAddress,
    isShowDefaultAddress: state.modalState.isShowDefaultAddress,
    isShowForget: state.modalState.isShowForget,
    isShowNewPass: state.modalState.isShowNewPass,
  }),
  (state) => state
);


export const {
  ShowModalLogin, 
  ShowModalSignUp,
  ShowModalAddress,
  ShowModalDefaultAddress, 
  ShowModalForget,
  ShowModalNewPass
} = modalSlice.actions;
export default modalSlice.reducer;

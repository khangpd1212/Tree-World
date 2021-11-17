import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
   isShowSignUp: false,
};

const SignUpSlice = createSlice({
   name: "SignUp",
   initialState,
   reducers: {
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

export const selectSignUp = createSelector(
   (state) => ({
      isShowSignUp: state.SignUpState.isShowSignUp,
   }),
   (state) => state
);

export const { ShowModalSignUp, onCancelSignUp, onOkSignUp } = SignUpSlice.actions;
export default SignUpSlice.reducer;

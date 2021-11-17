import { createSlice, createSelector} from "@reduxjs/toolkit";

const initialState = {
   payments: ["dsada"]
}

export const paymentSlice = createSlice({
   name: "payment",
   initialState,
   reducers: {
      
   }
})

export const selectCarts = createSelector(
   (state) => ({
      payments: state.paymentState.payments,
   }),
   (state) => state
);

export default createSlice.reducers
import {
   createSlice,
   createAsyncThunk,
   createSelector,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
   cartItems: [],
   cartTotalQuantity: 0,
   cartTotalAmount: 0,
}
export const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {
      addItemToCart: (state, action) => {
         const itemIndex = state.cartItems.findIndex(
            (item) => item._id === action.payload._id,
         );
         if(itemIndex >= 0){
            state.cartItems[itemIndex].quantity += 1
            toast.info(`increased ${state.cartItems[itemIndex].product_name} cart quantity`, {
               position: "top-right",
            });
         } else {
            const tempProduct = {...action.payload, quantity: 1};
            state.cartItems.push(tempProduct);
            toast.success(`${action.payload.product_name} added to cart`, {
               position: "top-right",
            });
         }

         localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      },
      btnIncrement: (state, action) => {
         const itemIndex = state.cartItems.findIndex(
            (item) => item._id === action.payload._id
         );
         if (itemIndex >= 0){
            state.cartItems[itemIndex].quantity += 1;
         }
         localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
      },
      btnDecrement: (state, action) => {
         const itemIndex = state.cartItems.findIndex(
            (item) => item._id === action.payload._id
         );
         if (state.cartItems[itemIndex].quantity > 1) {
            state.cartItems[itemIndex].quantity -= 1
         } else if (state.cartItems[itemIndex].quantity === 1) {
            const nextCartItems = state.cartItems.filter(
               (cartItem) => cartItem._id !== action.payload._id
            );

            state.cartItems = nextCartItems;
            toast.error(`${action.payload.product_name} removed from cart`, {
               position: "top-right",
            });
         }
         localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
      },
      removeCart: (state, action) => {
         const nextCartItems = state.cartItems.filter(
            (cartItem) => cartItem._id !== action.payload._id
         );
         state.cartItems = nextCartItems;
         toast.error(`${action.payload.product_name} removed from cart`, {
            position: "top-right",
         });
         localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
      },
   },
});
export const selectCarts = createSelector(
   (state) => ({
      cartItems: state.cartState.cartItems,
   }),
   (state) => state
);

export const { addItemToCart, btnIncrement, btnDecrement, removeCart } = cartSlice.actions;

export default cartSlice.reducer
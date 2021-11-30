import { createSlice, createSelector } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) =>
          item.product._id === action.payload.product._id &&
          item.pickColor === action.payload.pickColor
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += action.payload.quantity;
      } else {
        const tempProduct = {
          ...action.payload,
        };
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.product.product_name} added to cart`, {
          position: "bottom-left",
          autoClose: 2000,
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    btnIncrement: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.product._id === action.payload.product._id &&
          item.pickColor === action.payload.pickColor
      );
      if (itemIndex >= 0){
        state.cartItems[itemIndex].quantity += 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    btnDecrement: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.product._id === action.payload.product._id &&
          item.pickColor === action.payload.pickColor
      );
      if (state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;
      } else if (state.cartItems[itemIndex].quantity === 1) {
        const itemIndex = state.cartItems.findIndex(
          (item) => item.product._id === action.payload.product._id &&
            item.pickColor === action.payload.pickColor
        );
        state.cartItems.splice(itemIndex, 1);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.product._id === action.payload.product._id &&
          item.pickColor === action.payload.pickColor
      );
      state.cartItems.splice(itemIndex, 1);
      toast.error(`${action.payload.product.product_name} removed from cart`, {
        position: "bottom-left",
        autoClose: 2000,
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state, action) => {
      state.cartItems = [];
      toast.error(`Cart cleared`, {
        position: "bottom-left",
        autoClose: 2000,
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotals: (state, action) => {
      let total = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price } = cartItem.product;
          const { quantity } = cartItem;
          const itemTotal = price * quantity;
          cartTotal.total += itemTotal;
          return cartTotal;
        },
        {
          total: 0,
        }
      );
      state.cartTotalAmount = total;
      action.payload = total;
    },
  },
});
export const selectCarts = createSelector(
  (state) => ({
    cartItems: state.cartState.cartItems,
    cartTotalAmount: state.cartState.cartTotalAmount,
  }),
  (state) => state
);

export const { addItemToCart, btnIncrement, btnDecrement, removeCart, clearCart, getTotals } =
  cartSlice.actions;

export default cartSlice.reducer;

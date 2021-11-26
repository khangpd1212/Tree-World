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
          item._id === action.payload.product._id &&
          item.pickColor === action.payload.color
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += action.payload.qty;
      } else {
        const tempProduct = {
          ...action.payload.product,
          quantity: action.payload.qty,
          pickColor: action.payload.color,
        };
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.product.product_name} added to cart`, {
          position: "bottom-left",
          autoClose: 2000,
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    btnDecrement: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;
      } else if (state.cartItems[itemIndex].quantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem._id !== action.payload._id
        );

        state.cartItems = nextCartItems;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeCart: (state, action) => {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem._id !== action.payload._id
      );
      state.cartItems = nextCartItems;
      toast.error(`${action.payload.product_name} removed from cart`, {
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
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;
          cartTotal.total += itemTotal;
          return cartTotal;
        },
        {
          total: 0,
        }
      );
      state.cartTotalAmount = total;
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

export const { addItemToCart, btnDecrement, removeCart, clearCart, getTotals } =
  cartSlice.actions;

export default cartSlice.reducer;

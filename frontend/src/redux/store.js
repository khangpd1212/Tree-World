import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import postReducer from "./post";
import layoutReducer from "./layout";
import productReducer from "./product";
import catalogReducer from "./catalog";
import cartReducer from "./cart";
import paymentReducer from "./payment";
import addressReducer from "/address";
import loginReducer from "./login";
import SignUpReducer from "./SignUp";

export const store = configureStore({
  reducer: {
    userState: userReducer,
    postsState: postReducer,
    layoutState: layoutReducer,
    productState: productReducer,
    catalogState: catalogReducer,
    cartState: cartReducer,
    loginState: loginReducer,
    SignUpState: SignUpReducer,
    addressState: addressReducer,
    // paymentState: paymentReducer,
  },
});

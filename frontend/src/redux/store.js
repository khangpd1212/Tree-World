import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import postReducer from "./post";
import layoutReducer from "./layout";
import productReducer from "./product";
import catalogReducer from "./catalog";
import cartReducer from "./cart";
import orderReducer from "./order";
import orderDetailReducer from "./order_detail";
import addressReducer from "./address";
import modalReducer from "./modal";
import serviceReducer from "./service";
import filterReducer from "./filter";
import voucherReducer  from "./voucher";
import commentReducer from "./comment"

export const store = configureStore({
  reducer: {
    commentState: commentReducer,
    userState: userReducer,
    postsState: postReducer,
    layoutState: layoutReducer,
    productState: productReducer,
    catalogState: catalogReducer,
    cartState: cartReducer,
    modalState: modalReducer,
    voucherState: voucherReducer,
    // paymentState: paymentReducer,
    orderState: orderReducer,
    orderDetailState: orderDetailReducer,
    addressState: addressReducer,
    serviceState: serviceReducer,
    filterState: filterReducer,
  },
});

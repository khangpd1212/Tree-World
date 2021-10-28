import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users";
import postReducer from "./post";
import layoutReducer from "./layout";
import productReducer from "./product";
import catalogReducer from "./catalog";

export const store = configureStore({
  reducer: {
    usersState: userReducer,
    postsState: postReducer,
    layoutState: layoutReducer,
    productState: productReducer,
    catalogState: catalogReducer,
  },
});

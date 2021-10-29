import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./users";
import layoutReducer from "./layout";
import productsReducer from "./products";

export const store = configureStore({
    reducer: {
        usersState: userReducer,
        products: productsReducer,
        layoutState: layoutReducer,
    },
});

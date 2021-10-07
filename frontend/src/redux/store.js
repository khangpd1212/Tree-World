import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./users"
import postReducer from "./post"

export const store = configureStore({
    reducer: {
        usersState: userReducer,
        postsState: postReducer
    }
})
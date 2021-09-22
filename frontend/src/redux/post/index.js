import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    posts: []
}

const postSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setDataPosts: ((state, action)=> {
            state.posts = action.payload
        }),
    }
})

export const { setDataPosts } = postSlice.actions
export default  postSlice.reducer
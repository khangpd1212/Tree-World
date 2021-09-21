import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    username: null,
    token: null
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsername: ((state, action)=> {
            state.username = action.payload
        }),
        setToken: ((state, action)=> {
            state.token = action.payload
        }),
    }
})

export const { setUsername, setToken } = userSlice.actions
export default  userSlice.reducer
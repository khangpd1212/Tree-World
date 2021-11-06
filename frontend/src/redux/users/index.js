import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token")
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setToken: ((state, action) => {
            localStorage.setItem("token", action.payload)
            state.token = action.payload
        }),
    }
})

export const { setToken } = userSlice.actions
export default userSlice.reducer
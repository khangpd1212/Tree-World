const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    data: []
}

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setDataProducts: (state, action)=> {
            state.data = action.payload
        },
    }
})

export const {setDataProducts} = productsSlice.actions;
export default productsSlice.reducer
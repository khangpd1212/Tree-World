const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    data: [],
    initData: {
        products: null,
        catalogs: null
    }
}

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setDataProducts: (state, action)=> {
            state.data = action.payload
        },
        setInitData: (state, action)=> {
            state.initData
             = action.payload
        },
    }
})

export const {setDataProducts, setInitData} = productsSlice.actions;
export default productsSlice.reducer
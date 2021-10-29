import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    layoutStatus: false,
};

const layoutSlice = createSlice({
    name: "layout",
    initialState,
    reducers: {
        setLayoutStatus: (state, action) => {
            state.layoutStatus = action.payload;
        },
    },
});

export const {setLayoutStatus} = layoutSlice.actions;
export default layoutSlice.reducer;

import axios from "../../utils/axios";
import {
    createSlice,
    createAsyncThunk,
    createSelector,
} from "@reduxjs/toolkit";

const initialState = {
    voucherList: [],
    loading: "idle",
    error: "",
}
export const fetchGetVoucher = createAsyncThunk(
    "VOUCHER",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("voucher/");
            return await response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);
const voucherSlice = createSlice({
    name: "voucher",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchGetVoucher.pending, (state) => {
            state.loading = "loading";
        });
        builder.addCase(fetchGetVoucher.fulfilled, (state, action) => {
            state.voucherList = action.payload;
            state.loading = "loaded";
        });
        builder.addCase(fetchGetVoucher.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = "error";
        });
    },
});
export const selectVouchers = (state) => state.voucherState;
export default voucherSlice.reducer;
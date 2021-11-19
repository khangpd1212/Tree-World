import axios from "../../utils/axios";
import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

const initialState = {
    userItems: sessionStorage.getItem("userItem") 
    ? JSON.parse(sessionStorage.getItem("userItem"))
    : {},
    loading: "idle",
    error: "",
}

export const fetchRegister = createAsyncThunk(
    "REGISTER",
    async (data, thunkAPI) => {
        try {
            const response = await axios.post("auth/register", data);
            return await response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const fetchLogin = createAsyncThunk(
    "LOGIN",
    async (body, thunkAPI) => {
        try {
            const { data } = await axios.post("auth/login/", body);
            sessionStorage.setItem("userItem", JSON.stringify(data))
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchLogin.pending, (state) => {
            state.loading = "loading";
        });
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            state.userItems = action.payload;
            state.loading = "loaded";
        });
        builder.addCase(fetchLogin.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = "error";
        });
    },
});
export const selectUsers = (state) => state.userState;
export default userSlice.reducer;
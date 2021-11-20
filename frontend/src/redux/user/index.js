import axios from "../../utils/axios";
import {
    createSlice,
    createAsyncThunk,
    createSelector,
} from "@reduxjs/toolkit";

const initialState = {
    signIn: {},
    userList: [],
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
export const fetchGetUser = createAsyncThunk(
    "USER",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("user/");
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
            localStorage.setItem("token", data.accessToken)
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
            state.signIn = action.payload;
            state.loading = "loaded";
        });
        builder.addCase(fetchLogin.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = "error";
        });
        builder.addCase(fetchGetUser.pending, (state) => {
            state.loading = "loading";
        });
        builder.addCase(fetchGetUser.fulfilled, (state, action) => {
            state.userList = action.payload;
            state.loading = "loaded";
        });
        builder.addCase(fetchGetUser.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = "error";
        });
    },
});
export const selectUsers = (state) => state.userState;
export default userSlice.reducer;
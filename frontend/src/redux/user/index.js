import axios from "../../utils/axios";
import {
    createSlice,
    createAsyncThunk,
    createSelector,
} from "@reduxjs/toolkit";

const initialState = {
    userList: [],
    loading: "idle",
    error: "",
    token: localStorage.getItem("token")
}
export const fetchUsers = createAsyncThunk(
    "GET_ALL_USERS",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("user/");
            return await response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

export const login = createAsyncThunk(
    "LOGIN",
    async (body, thunkAPI) => {
        try {
            const {data} = await axios.post("auth/login/", body);
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
        builder.addCase(fetchUsers.pending, (state) => {
            state.userList = [];
            state.loading = "loading";
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.userList = action.payload;
            state.loading = "loaded";
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = "error";
        });
    },
});
export const selectUsers =  (
    (state) => ({
        userList: state.userState.userList,
        loading: state.userState.loading,
    }),
    (state) => state
);
export default userSlice.reducer;
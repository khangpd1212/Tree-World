import axios from "../../utils/axios";
import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

const initialState = {
  userList: [],
  username: "",
  email: "",
  phoneNumber: "",
  loading: "idle",
  error: "",
};
export const signupUser = createAsyncThunk(
  "SignUpUser",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const response = await axios.get("user/", {
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      return await response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const loginUser = createAsyncThunk(
  "SignUpLogin",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("user/");
      return await response.data;
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
    builder.addCase(signupUser.pending, (state) => {
      state.userList = [];
      state.loading = "loading";
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.userList = action.payload;
      state.loading = "loaded";
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = "error";
    });
  },
});
export const selectUsers = createSelector(
  (state) => ({
    userList: state.userState.userList,
    loading: state.userState.loading,
  }),
  (state) => state
);
export default userSlice.reducer;

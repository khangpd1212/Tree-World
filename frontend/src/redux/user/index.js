import axios from "utils/axios";
import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify"

const initialState = {
  userList: [],
  adminItems: {},
  userItems: {},
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
      let { data } = await axios.post("auth/login/", body);
      data.isAdmin === false && localStorage.setItem("token", JSON.stringify(data.accessToken));
      return data.isAdmin === false ? data : {};
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const fetchLoginAdmin = createAsyncThunk(
  "LOGIN_ADMIN",
  async (body, thunkAPI) => {
    try {
      let { data } = await axios.post("auth/login/", body);
      data.isAdmin  === true && localStorage.setItem("tokenAdmin", JSON.stringify(data.accessToken))
      return data.isAdmin === true ? data : {}
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    onRemoveUser: (state, action) => {
      localStorage.removeItem('token');
      state.userItems = {}
    },
    onRemoveAdmin: (state, action) => {
      localStorage.removeItem('tokenAdmin');
      state.adminItems = {}
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.userItems = action.payload;
      state.loading = "loaded";
    });

    builder.addCase(fetchGetUser.fulfilled, (state, action) => {
      state.userList = action.payload;
      state.loading = "loaded";
    });

    builder.addCase(fetchLoginAdmin.fulfilled, (state, action) => {
      state.adminItems = action.payload;
      state.loading = "loaded";
    });


  },
});
export const selectUsers = (state) => state.userState;
export const { onRemoveUser, onRemoveAdmin } = userSlice.actions
export default userSlice.reducer;
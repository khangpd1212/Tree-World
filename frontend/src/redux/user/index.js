import axios from "utils/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  userList: [],
  adminItems: {},
  userItems: {},
  loading: "idle",
  error: "",
};


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
export const fetchGetUser = createAsyncThunk("USER", async (_, thunkAPI) => {
  try {
    const response = await axios.get("user/");
    return await response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});
export const fetchLogin = createAsyncThunk("LOGIN", async (body, thunkAPI) => {
  try {
    let { data } = await axios.post("auth/login/", body);
    if (data.isAdmin === false) {
      localStorage.setItem("token", JSON.stringify(data.accessToken));
      return data;
    } else {
      toast.error(`Login is error`, {
        position: "bottom-left",
        autoClose: 2000,
      });
      return {};
    }
  } catch (error) {
    toast.error(error.response.data, {
      position: "bottom-left",
      autoClose: 2000,
    });
    return {};
  }
});
export const fetchLoginAdmin = createAsyncThunk(
  "LOGIN_ADMIN",
  async (body) => {
    try {
      let { data } = await axios.post("auth/login/", body);
      if (data.isAdmin === true) {
        localStorage.setItem("tokenAdmin", JSON.stringify(data.accessToken));
        return data;
      } else {
        toast.error(`Login is error`, {
          position: "bottom-left",
          autoClose: 2000,
        });
        return {};
      }
    } catch (error) {
      toast.error(`Login is error`, {
        position: "bottom-left",
        autoClose: 2000,
      });
      return {};
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    onRemoveUser: (state, action) => {
      localStorage.removeItem("token");
      state.userItems = {};
    },
    onRemoveAdmin: (state, action) => {
      localStorage.removeItem("tokenAdmin");
      state.adminItems = {};
    },
    loadVoucher: (state, action) => {
      state.userItems = { ...state.userItems, id_voucher: action.payload };
    },
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
export const { onRemoveUser, onRemoveAdmin, loadVoucher } = userSlice.actions;
export default userSlice.reducer;

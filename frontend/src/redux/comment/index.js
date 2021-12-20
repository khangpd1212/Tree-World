import axios from "../../utils/axios";
import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

const initialState = {
  commentList: [],
  filterCommentList: [],
  loading: "idle",
  error: "",
};
export const fetchGetComment = createAsyncThunk(
  "COMMENT",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("comment/");
      return await response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const filterComment = createAsyncThunk(
  "FILTER",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`comment/filter?star=${data}`);
      return await response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetComment.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(fetchGetComment.fulfilled, (state, action) => {
      state.commentList = action.payload;
      state.loading = "loaded";
    });
    builder.addCase(fetchGetComment.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = "error";
    });
    builder.addCase(filterComment.pending, (state) => {
      return { ...state, loading: "loading" };
    });
    builder.addCase(filterComment.fulfilled, (state, action) => {
      return { ...state, filterCommentList: action.payload, loading: "loaded" };
    });
    builder.addCase(filterComment.rejected, (state, action) => {
      return { ...state, loading: "error", error: action.error.message };
    });
  },
});
export const selectComment = (state) => state.commentState;
export default commentSlice.reducer;

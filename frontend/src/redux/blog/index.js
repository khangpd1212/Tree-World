import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "../../utils/axios";
const initialState = {
  blogList: [],
  blog: {},
  loading: "idle",
  error: "",
};
export const fetchBlogs = createAsyncThunk(
  "GET_ALL_BLOGS",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("blog/");
      return await response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
const blogSlice = createSlice({
  name: "blog",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.pending, (state) => {
      return { ...state, loading: "loading" };
    });
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      return { ...state, loading: "loaded", blogList: action.payload };
    });
    builder.addCase(fetchBlogs.rejected, (state, action) => {
      return { ...state, loading: "error", error: action.error.message };
    });
  },
});
export const selectBlogs = createSelector(
  (state) => ({
    blogList: state.blogState.blogList,
    loading: state.blogState.loading,
  }),
  (state) => state
);
export default blogSlice.reducer;

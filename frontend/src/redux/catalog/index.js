import axios from "../../utils/axios";
import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
const initialState = {
  catalogList: [],
  loading: "idle",
  error: "",
};
export const fetchCatalogs = createAsyncThunk(
  "GET_ALL_CATALOGS",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("catalog/");
      return await response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCatalogs.pending, (state) => {
      return { ...state, loading: "loading" };
    });
    builder.addCase(fetchCatalogs.fulfilled, (state, action) => {
      return { ...state, loading: "loaded", catalogList: action.payload };
    });
    builder.addCase(fetchCatalogs.rejected, (state, action) => {
      return { ...state, loading: "error", error: action.error.message };
    });
  },
});
export const selectCatalogs = createSelector(
  (state) => ({
    catalogList: state.catalogState.catalogList,
    loading: state.catalogState.loading,
  }),
  (state) => state
);

export default catalogSlice.reducer;
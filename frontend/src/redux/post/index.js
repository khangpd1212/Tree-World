import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { axiosRequest } from '../../utils/axios';
import { requests } from '../../utils/requests';

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        const response = await axiosRequest("get", requests.fetchAllPosts, '')
        return response;
    }
)
const postSlice = createSlice({
    name: "posts",
    initialState: {
        entities: [], 
        loading: false,
        error: "",
    },
    reducers: {},
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.loading = true;
        },
        [fetchPosts.rejected]: (state,action) =>{
            state.loading = false;
            state.error = action.error;
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.loadding = false;
            state.entities = action.payload;
        },
    }
})

// export const { setDataPosts } = postSlice.actions
const {reducer: postReducer} = postSlice;
export default postReducer;
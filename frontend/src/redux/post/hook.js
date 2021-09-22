import {useSelector} from "react-redux";

export const useDataPosts = () => {
    return useSelector((state => state.postsState.posts))
}
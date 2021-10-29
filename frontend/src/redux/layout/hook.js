import {useSelector} from "react-redux";

export const useLayoutStatus = () => {
    return useSelector((state) => state.layoutState.layoutStatus);
};

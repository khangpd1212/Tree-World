import {useSelector} from "react-redux";

export const useUsername = () => {
    return useSelector((state => state.usersState.username))
}

export const useToken = () => {
    return useSelector((state => state.usersState.token))
}
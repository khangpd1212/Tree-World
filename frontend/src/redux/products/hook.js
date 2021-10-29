import { useSelector } from "react-redux"

export const useDataProducts = ()=> {
    return useSelector((state=> state.products.data))
}
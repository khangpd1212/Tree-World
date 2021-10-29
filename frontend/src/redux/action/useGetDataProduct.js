import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setDataProducts } from "redux/products"
import { request } from "utils/axios"

export const useGetProducts = () => {

    const dispatch = useDispatch()

    const getData = async ()=> {
        const data = await request.allProducts()
        dispatch(setDataProducts(data))
    }
    useEffect(()=> {
        getData()
    }, [])

    return {getData}
}
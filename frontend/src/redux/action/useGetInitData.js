import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setDataProducts, setInitData } from "redux/products"
import { request } from "utils/axios"

export const useGetInitData = () => {

    const dispatch = useDispatch()

    const getData = async ()=> {
        const [products, catalogs] = await Promise.all([request.allProducts(), request.allCatalog()])
        dispatch(setDataProducts(products))
        dispatch(setInitData({
            products,
            catalogs
        }))
    }
    useEffect(()=> {
        getData()
    }, [])
}
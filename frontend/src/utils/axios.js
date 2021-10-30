import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8800"
})

export const request = {
    allProducts() {
        return instance
            .get("/product")
            .then(({ data }) => data)
    },
    productById(id) {
        return instance
            .get("/product" + id)
            .then((data) => data)
    },
    newProducts(token, data) {
        var config = {
            method: 'post',
            url: 'http://localhost:8800/product',
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            },
            data: data
        };
        return instance(config)
    },
    allCatalog() {
        return instance
            .get("/catalog")
            .then(({ data }) => data)
    },
}
export default instance
import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8800/"
})

// methods { "get" || "post" .... }
export const axiosRequest = (methods, requests, data) => {
    if (data) {
        return instance[methods](requests, data).then(({data}) => data)
    }
    return instance[methods](requests).then(({data}) => data)
}
export default instance
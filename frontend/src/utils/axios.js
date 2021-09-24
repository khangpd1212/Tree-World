import axios from "axios";

const instance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/"
})

// methods { "get" || "post" .... }
export const axiosRequest = (methods, requests, data) => {
    if (data) {
        return instance[methods](requests, data).then(({data}) => data)
    }
    return instance[methods](requests).then(({data}) => data)
}

export default instance
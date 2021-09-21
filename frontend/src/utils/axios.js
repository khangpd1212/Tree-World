import axios from "axios";

const instance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/"
})

// methods { "get" || "post" .... }
export const axiosRequest = (methods, requests) => {
    return instance[methods](requests).then(({data}) => data)
}

export default instance
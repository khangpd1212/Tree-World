import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8800/",
});

export const requests = {
  async fetchAllProduct() {
    const { data } = await instance.get('/product')
    return data
  },
  async fetchProduct(id) {
    const { data } = await instance.get('/product/' + id)
    return data
  },
  async editProduct(token, body, id) {
    console.log(body);
    const config = {
      method: 'put',
      url: 'http://localhost:8800/product/' + id,
      headers: {
        'Authorization': 'Bearer ' + token
      },
      data: body
    };
    const { data } = await instance(config)
    return data
  },
}

export const imgbbClient = axios.create({
  baseURL: "https://api.imgbb.com/1/upload?key=403852fdf7303df5e119b675b814876f"
})

export const postImg = async (img)=> {
  const config = {
    method: 'post',
    url: 'https://api.imgbb.com/1/upload',
    data: {
      key: "403852fdf7303df5e119b675b814876f",
      image: img[0]
    }
  };
  const {data} = await imgbbClient(config)
  console.log("data imgbb", data);
  return data
}
export default instance;

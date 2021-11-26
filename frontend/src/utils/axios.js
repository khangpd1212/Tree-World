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
  async editProduct(token, body, id, img) {
    const config = {
      method: 'put',
      url: '/product/' + id,
      headers: {
        'Authorization': 'Bearer ' + token
      },
      data: {
        ...body,
        image: img
      }
    };
    if (img !== "") {
      const { data } = await instance(config)
      return data
    }
    return Promise.reject()
  },
  async addProduct(token, body, img) {
    console.log("img", img);
    const config = {
      method: 'post',
      url: '/product/',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      data: {
        ...body,
        image: img
      }
    };
    if (img !== "") {
      const { data } = await instance(config)
      return data
    }
    return Promise.reject()
  },
  async deleteProduct(token, id) {
    const config = {
      method: 'delete',
      url: '/product/' + id,
      headers: {
        'Authorization': 'Bearer ' + token
      }
    };
    return instance(config)
      .then(({ data }) => data)
      .catch(err => err)
  },
  //catalog
    async fetchAllCatalog() {
    const { data } = await instance.get('/catalog')
    return data
  },

  async getAddressByUser(idUser) {
    const config = {
      method: 'get',
      url: `/address/?idUser=${idUser}`,
    };
    const { data } = await instance(config)
    return data
  },
}


export const imgbbClient = axios.create({
  baseURL: "https://api.imgbb.com/1/upload?key=403852fdf7303df5e119b675b814876f"
})

export const postImg = async (img) => {
  const config = {
    method: 'post',
    url: 'https://api.imgbb.com/1/upload',
    data: {
      key: "403852fdf7303df5e119b675b814876f",
      image: img[0]
    }
  };
  const { data } = await imgbbClient(config)
  console.log("data imgbb", data);
  return data
}


// order 
export default instance;

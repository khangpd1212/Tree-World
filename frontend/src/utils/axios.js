import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8800/",
});

const tokenAdmin = JSON.parse(localStorage.getItem("tokenAdmin"));
const token = JSON.parse(localStorage.getItem("token"));

export const requests = {
  async fetchAllProduct() {
    const { data } = await instance.get("/product");
    return data;
  },
  async fetchProduct(id) {
    const { data } = await instance.get("/product/" + id);
    return data;
  },
  async editProduct( body, id) {
    console.log(tokenAdmin)
    const checkToken = tokenAdmin ? tokenAdmin : token
    const config = {
      method: "put",
      url: "/product/" + id,
      headers: {
        Authorization: "Bearer " + checkToken,
      },
      data: body,
    };
    console.log(config)
    const { data } = await instance(config);
    return data;
  },
  async addProduct(body, img) {
    const config = {
      method: "post",
      url: "/product/",
      headers: {
        Authorization: "Bearer " + tokenAdmin,
      },
      data: {
        ...body,
        image: img,
      },
    };
    if (img !== "") {
      const { data } = await instance(config);
      return data;
    }
    return Promise.reject();
  },
  async deleteProduct(id) {
    const config = {
      method: "delete",
      url: "/product/" + id,
      headers: {
        Authorization: "Bearer " + tokenAdmin,
      },
    };
    return instance(config)
      .then(({ data }) => data)
      .catch((err) => err);
  },
  //catalog
  async fetchAllCatalog() {
    const { data } = await instance.get("/catalog");
    return data;
  },
  async addCatalog(body) {
    const config = {
      method: "post",
      url: "/catalog/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenAdmin}`,
      },
      data: body,
    };
    const { data } = await instance(config);
    return data;
  },
  async editCatalog(body, id) {
    const config = {
      method: "put",
      url: `/catalog/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenAdmin}`,
      },
      data: body,
    };
    const { data } = await instance(config);
    return data;
  },
  //voucher
  async addVoucher(body) {
    const config = {
      method: "post",
      url: "/voucher/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenAdmin}`,
      },
      data: body,
    };
    const { data } = await instance(config);
    return data;
  },
  async editVoucher(body, id) {
    const config = {
      method: "put",
      url: `/voucher/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenAdmin}`,
      },
      data: body,
    };
    const { data } = await instance(config);
    return data;
  },

  //blog
  async addBlog(body, img, id) {
    const config = {
      method: "post",
      url: "/blog/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenAdmin}`,
      },
      data: {
        ...body,
        image: img,
        id_user: id,
      },
    };
    const { data } = await instance(config);
    return data;
  },

  async editBlog(body, id) {
    const config = {
      method: "put",
      url: `/blog/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenAdmin}`,
      },
      data: body,
    };
    const { data } = await instance(config);
    return data;
  },

  async getAddressByUser(idUser) {
    const config = {
      method: "get",
      url: `/address/?idUser=${idUser}`,
    };
    const { data } = await instance(config);
    return data;
  },
  async editUser(body, id) {
    const config = {
      method: "put",
      url: `/user/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenAdmin}`,
      },
      data: body,
    };
    const { data } = await instance(config);
    return data;
  },
  async addComment(body) {
    const config = {
      method: "post",
      url: "/comment/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenAdmin}`,
      },
      data: body,
    };
    const { data } = await instance(config);
    return data;
  },
  async editComment(body, id) {
    const config = {
      method: "put",
      url: `/comment/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenAdmin}`,
      },
      data: body,
    };
    const { data } = await instance(config);
    return data;
  },
  async fetchResetPassword(body) {
    const config = {
      method: "post",
      url: `/auth/reset-password`,
      headers: {
        "Content-Type": "application/json",
      },
      data: body
    };
    const { data } = await instance(config);
    return data
  },
  async fetchNewPassword(id, token, body) {
    const config = {
      method: "post",
      url: `auth/reset-password/${id}/${token}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: body
    };
    const { data } = await instance(config);
    return data
  }
};

export const imgbbClient = axios.create({
  baseURL:
    "https://api.imgbb.com/1/upload?key=403852fdf7303df5e119b675b814876f",
});

export const postImg = async (img) => {
  const config = {
    method: "post",
    url: "https://api.imgbb.com/1/upload",
    data: {
      key: "403852fdf7303df5e119b675b814876f",
      image: img[0],
    },
  };
  const { data } = await imgbbClient(config);
  console.log("data imgbb", data);
  return data;
};

// order
export default instance;

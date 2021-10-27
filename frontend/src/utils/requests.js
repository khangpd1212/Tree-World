export const requests = {
    fetchAllPosts: "posts",
    fetchPost(id){
        return `posts/${id}`
    },

    // product
    fetAllProduct: "product",
    fetchProduct(id){
        return `product/${id}`
    },
}
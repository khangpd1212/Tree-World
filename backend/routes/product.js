const router = require("express").Router();
const Product = require("../models/Product");

// get all products
//link http://localhost:8800/product/ method get
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) throw new Error("No items");
    res.status(200).json(products);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// create product
router.post("/", async (req, res) => {
  const { product_name, price, description, isHot, isNew, catalog_id, image } =
    req.body;

  const newProduct = new Product({
    product_name,
    price,
    description,
    isHot,
    isNew,
    catalog_id,
    image,
  });

  try {
    const product = await newProduct.save();
    if (!product) throw new Error("Something were wrong with saving product");
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
